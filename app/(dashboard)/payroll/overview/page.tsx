import React from "react";
import { getAuthCookies } from "@/lib/server/api";
import { apiCaller } from "@/lib/auth";
import { PayrollOverviewHeader } from "@/app/(dashboard)/payroll/_components/PayrollOverviewHeader";
import { PayrollOverviewTable } from "@/app/(dashboard)/payroll/_components/PayrollOverviewTable";
import { Payroll } from "@/app/(dashboard)/payroll/history/page";

async function getPayrollOverview() {
  try {
    const res = await apiCaller.get<Payroll[]>("/api/payroll_app/payrolls/", {
      headers: getAuthCookies(),
    });
    return res.data;
  } catch (err) {
    throw new Error(`Error getPayroll: ${err}`);
  }
}

const PayrollOverviewPage = async (): Promise<React.ReactNode> => {
  const payrollData: Payroll[] = await getPayrollOverview();
  return (
    <div className={"container w-full"}>
      <PayrollOverviewHeader />

      <div>
        <PayrollOverviewTable payrollData={payrollData} />
      </div>
    </div>
  );
};

export default PayrollOverviewPage;