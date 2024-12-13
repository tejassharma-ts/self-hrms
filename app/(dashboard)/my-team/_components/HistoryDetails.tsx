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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMonthNameFromNumber } from "@/lib/utils";

const tableHeadValues: string[] = [
  "Casual Leave",
  "Privilege Leave",
  "Sick Leave",
  "Used Privilege Leaves",
];

const LeaveBalanceTable = ({ leaves }: { leaves: any }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeadValues.map((eachTableHead: string, index: number) => (
            <TableHead key={index}>{eachTableHead}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{leaves?.employee_leave_stats.total_casual_leaves}</TableCell>
          <TableCell>{leaves?.employee_leave_stats.privilege_leave_balance}</TableCell>
          <TableCell>{leaves?.employee_leave_stats.sick_leave_balance}</TableCell>
          <TableCell>{leaves?.employee_leave_stats.used_privilege_leaves}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

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
  const monthName = getMonthNameFromNumber(month);

  return (
    <div>
      <div className={"flex items-center justify-between gap-20"}>
        {category === "leaves" && <LeaveBalanceTable leaves={leaves} />}
        <div className={"flex justify-end gap-x-2"}>
          <MonthFilter month={monthName} />
          <YearFilter year={year} />
        </div>
      </div>
      <HistoryTabs employeeId={employeeId} />
      <div>
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
