import React from "react";
import { EmployeePayrollHistoryCard } from "../_components/EmployeePayrollHistoryCard";
import { BonusesAndDeductionsCard } from "../_components/BonusesAndDeductionsCard";
import { ExpenseCard } from "../../expenses/_components/ExpenseCard";

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
