import React from "react";
import { ExpenseCard } from "@/app/expenses/_components/ExpenseCard";
import { EmployeePayrollHistoryCard } from "@/app/payroll/_components/EmployeePayrollHistoryCard";
import { BonusesAndDeductionsCard } from "@/app/payroll/_components/BonusesAndDeductionsCard";

export const PayrollHeader = (): React.ReactNode => {
  return (
    <>
      <div className={"mb-10 grid grid-cols-4 gap-4"}>
        <ExpenseCard heading={"Total Payroll Expenses"} money={"58,764.25"} />
        <BonusesAndDeductionsCard heading={"Bonuses and Deductions"} />
        <EmployeePayrollHistoryCard heading={"Total Payroll Expenses"} />
      </div>
    </>
  );
};
