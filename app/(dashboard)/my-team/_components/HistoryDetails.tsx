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
}: {
  attendance: EmployeeAttendance;
  employeeProfile: Employee;
  leaves: LeavesResponse;
  bonuses: Bonuses;
  deductions: Deductions;
  expenses: ExpensesDetails[];
  payrollData: Payroll;
}) => {
  const employeeId = employeeProfile.id;
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className={"container"}>
      <div className={"flex items-center justify-between"}>
        <h1 className={"text-2xl font-bold"}>
          Leave Balance for september : {leaves.employee_leave_stats.total_leaves_per_year}
        </h1>
        <div className={"flex gap-x-2"}>
          <MonthFilter />
          <YearFilter />
        </div>
      </div>
      <HistoryTabs employeeId={employeeId} />
      <div className={"max-w-[70rem]"}>
        {category === "leaves" && (
          <LeaveRequestTable leaveRequestTableData={leaves.leaves_request} />
        )}
        {category === "attendance" && <AttendanceTable attendance={attendance} />}
        {category === "bonus" && <BonusTable bonuses={bonuses} />}
        {category === "deduction" && <DeductionsTable deductions={deductions} />}
        {category === "expense" && <HistoryExpensesTable expenses={expenses} />}
        {category === "payroll" && <HistoryPayrollTable payrollData={payrollData} />}
      </div>
    </div>
  );
};
