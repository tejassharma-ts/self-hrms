import React from "react";
import { EmployeePayrollHistoryCard } from "../_components/EmployeePayrollHistoryCard";
import { BonusesAndDeductionsCard } from "../_components/BonusesAndDeductionsCard";
import { ExpenseCard } from "../../expenses/_components/ExpenseCard";
import { Payroll } from "@/types/types";

export const PayrollHeader = ({ payrollData }: { payrollData: Payroll[] }): React.ReactNode => {
  return (
    <>
      <div className={"mb-10 grid grid-cols-4 gap-4"}>
        <ExpenseCard heading={"Total Payroll Expenses"} money={"58,764.25"} />
        <BonusesAndDeductionsCard
          totalDeductions={payrollData[0]?.total_deductions || "N/A"}
          bonus={payrollData[0]?.bonus || "0.00"}
          heading={"Bonuses and Deductions"}
        />
        <EmployeePayrollHistoryCard
          payrollData={payrollData}
          heading={"Employee Payroll History"}
        />
      </div>
    </>
  );
};
