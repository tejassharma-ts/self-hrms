"use client";
import React from "react";

import { HistoryTabs } from "@/app/(dashboard)/my-team/_components/HistoryTabs";
import { useSearchParams } from "next/navigation";
import {
  Bonuses,
  Deductions,
  Employee,
  EmployeeAttendance,
  ExpensesDetails,
  LeavesResponse,
  Payroll,
} from "@/types/types";
import { LeaveRequestTable } from "@/app/(dashboard)/my-team/_components/LeaveRequestTable";
import { AttendanceTable } from "@/app/(dashboard)/my-team/_components/AttendanceTable";
import { BonusTable } from "@/app/(dashboard)/my-team/_components/BonusTable";
import { DeductionsTable } from "@/app/(dashboard)/my-team/_components/DeductionsTable";
import { HistoryExpensesTable } from "@/app/(dashboard)/my-team/_components/HistoryExpensesTable";
import { MonthFilter } from "@/components/MonthFilter";
import { YearFilter } from "@/components/YearFilter";
import { HistoryPayrollTable } from "@/app/(dashboard)/my-team/_components/HistoryPayrollTable";

export const HistoryDetails = ({
  attendance,
  employeeProfile,
  leaves,
  bonuses,
  deductions,
  expenses,
  payrollData,
  month,
  year,
  holidays,
}: {
  attendance: EmployeeAttendance;
  employeeProfile: Employee;
  leaves: LeavesResponse;
  bonuses: Bonuses;
  deductions: Deductions;
  expenses: ExpensesDetails[];
  payrollData: Payroll;
  month: number;
  year: number;
  holidays: any;
}) => {
  const employeeId = employeeProfile.id;
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className={"container"}>
      <div className={"flex items-center justify-between"}>
        {category === "leaves" && (
          <div>
            <h1 className={"text-nowrap text-xl font-bold"}>
              Casual Leave balance : {leaves?.employee_leave_stats.total_casual_leaves}
            </h1>
            <h1 className={"text-nowrap text-xl font-bold"}>
              Privilege Leave Balance : {leaves?.employee_leave_stats.privilege_leave_balance}
            </h1>
            <h1 className={"text-nowrap text-xl font-bold"}>
              Sick Leave Balance : {leaves?.employee_leave_stats.sick_leave_balance}
            </h1>
            <h1 className={"text-nowrap text-xl font-bold"}>
              Total Sick leaves : {leaves?.employee_leave_stats.total_sick_leaves}
            </h1>
            <h1 className={"text-nowrap text-xl font-bold"}>
              Used privilege leaves : {leaves?.employee_leave_stats.used_privilege_leaves}
            </h1>
          </div>
        )}
        <div className={"flex w-full justify-end gap-x-2"}>
          <MonthFilter />
          <YearFilter />
        </div>
      </div>
      <HistoryTabs employeeId={employeeId} />
      <div className={"max-w-[70rem]"}>
        {category === "leaves" && (
          <LeaveRequestTable leaveRequestTableData={leaves?.leaves_request} />
        )}
        {category === "attendance" && (
          <AttendanceTable attendance={attendance} month={month} year={year} holidays={holidays} />
        )}
        {category === "bonus" && <BonusTable bonuses={bonuses} />}
        {category === "deduction" && <DeductionsTable deductions={deductions} />}
        {category === "expense" && <HistoryExpensesTable expenses={expenses} />}
        {category === "payroll" && <HistoryPayrollTable payrollData={payrollData} />}
      </div>
    </div>
  );
};
