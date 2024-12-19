import React from "react";
// import { getAuthCookies } from "@/lib/server/api";
import { apiCaller } from "@/lib/auth";
import { PayrollOverviewHeader } from "@/app/(dashboard)/payroll/_components/PayrollOverviewHeader";
import { PayrollOverviewTable } from "@/app/(dashboard)/payroll/_components/PayrollOverviewTable";
import { Payroll } from "@/types/types";
import { cookies } from "next/headers";
import AddPayroll from "../_components/AddPayroll";
import { YearMonthSelector } from "../../dashboard/_components/YearMonthSelector";
import { YearFilter } from "@/components/YearFilter";
import { MonthFilter } from "@/components/MonthFilter";
import { getMonthNameFromNumber, months } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getPayrollOverview({ month, year }: { month: number; year: number }) {
  try {
    const res = await apiCaller.get("/api/payroll_app/payrolls/", {
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
      params: {
        month,
        year,
      },
    });

    return res.data.results.payrolls;
  } catch (err) {
    console.log(err);
  }
}

type PayrollOverviewPageProps = {
  searchParams: {
    month: string;
    year: number;
  };
};
const PayrollOverviewPage = async ({
  searchParams,
}: PayrollOverviewPageProps): Promise<React.ReactNode> => {
  const month = months.indexOf(searchParams.month) + 1 || new Date().getMonth();
  const monthName = getMonthNameFromNumber(month);

  const payrollData: any = await getPayrollOverview({ month, year: searchParams.year });

  if (!payrollData) return;
  return (
    <div className={"container w-full"}>
      <PayrollOverviewHeader
        bonus={payrollData[0]?.bonus || "N/A"}
        totalDeductions={payrollData[0]?.total_deductions || "N/A"}
      />
      <div className="flex flex-col">
        <div className="flex items-center justify-end space-x-4">
          <MonthFilter month={monthName} />
          <YearFilter year={new Date().getFullYear()} />
          <AddPayroll />
        </div>
        <PayrollOverviewTable payrollData={payrollData} />
      </div>
    </div>
  );
};

export default PayrollOverviewPage;
