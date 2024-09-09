"use client";
import React from "react";
import { PayrollHeader } from "@/app/payroll/_components/PayrollHeader";
import EmployeePayroll from "@/app/payroll/_components/EmployeePayroll";
import { PayrollTable } from "@/app/payroll/_components/PayrollTable";
import { useSearchParams } from "next/navigation";

const Page = (): React.ReactNode => {
  const searchParams: URLSearchParams = useSearchParams();
  const showPayrollHistory: boolean = searchParams.get("payroll-history") !== null;

  return (
    <div className={"container w-full"}>
      <PayrollHeader />
      {!showPayrollHistory ? (
        <div>
          <PayrollTable />
        </div>
      ) : (
        <div>
          <EmployeePayroll />
        </div>
      )}
    </div>
  );
};

export default Page;
