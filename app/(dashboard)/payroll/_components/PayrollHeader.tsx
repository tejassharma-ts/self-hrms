import React from "react";
import { EmployeePayrollHistoryCard } from "../_components/EmployeePayrollHistoryCard";
import { BonusesAndDeductionsCard } from "../_components/BonusesAndDeductionsCard";
import { Payroll } from "@/types/types";
import { getMonthNameFromNumber } from "@/lib/utils";
import { PayrollHeaderCard } from "@/app/(dashboard)/payroll/_components/PayrollHeaderCard";

export const PayrollHeader = ({ payrollData }: { payrollData: Payroll[] }): React.ReactNode => {
  const monthNumber = payrollData[0]?.created_at.split("-")[1];
  const month: string = getMonthNameFromNumber(parseInt(monthNumber));
  const year = parseInt(payrollData[0]?.created_at.split("-")[0]);

  return (
    <>
      <div className={"mb-10 flex max-w-screen-lg justify-between gap-x-4"}>
        <PayrollHeaderCard heading={"Payroll of Month"} month={month} year={year} />
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
