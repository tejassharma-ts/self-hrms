import React from "react";
// import { getAuthCookies } from "@/lib/server/api";
import { apiCaller } from "@/lib/auth";
import { PayrollOverviewHeader } from "@/app/(dashboard)/payroll/_components/PayrollOverviewHeader";
import { PayrollOverviewTable } from "@/app/(dashboard)/payroll/_components/PayrollOverviewTable";
import { Payroll } from "@/types/types";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function getPayrollOverview() {
  try {
    const res = await apiCaller.get<Payroll[]>("/api/payroll_app/payrolls/", {
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
    });
    return res.data.results.payrolls;
  } catch (err) {
    throw new Error(`Error getPayroll Overview: ${err}`);
  }
}

const PayrollOverviewPage = async (): Promise<React.ReactNode> => {
  const payrollData: Payroll[] = await getPayrollOverview();

  return (
    <div className={"container w-full"}>
      <PayrollOverviewHeader
        bonus={payrollData[0]?.bonus}
        totalDeductions={payrollData[0]?.total_deductions}
      />
      <div>
        <PayrollOverviewTable payrollData={payrollData} />
      </div>
    </div>
  );
};

export default PayrollOverviewPage;
