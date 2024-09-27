import React from "react";
import { EmployeePayrollHistoryCard } from "../_components/EmployeePayrollHistoryCard";
import { BonusesAndDeductionsCard } from "../_components/BonusesAndDeductionsCard";
import { ExpenseCard } from "../../expenses/_components/ExpenseCard";
import { Payroll } from "@/types/types";
import { getMonthNameFromNumber } from "@/lib/utils";

export const PayrollHeader = ({ payrollData }: { payrollData: Payroll[] }): React.ReactNode => {
  const monthNumber = payrollData[0].created_at.split("-")[1];
  const month = getMonthNameFromNumber(parseInt(monthNumber));
  return (
    <>
      <div className={"mb-10 flex max-w-screen-lg justify-between gap-x-4"}>
        <ExpenseCard heading={"Payroll of "} month={month} />
        <BonusesAndDeductionsCard
          totalDeductions={payrollData[0]?.total_deductions || 0.0}
          bonus={payrollData[0]?.bonus || 0.0}
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
