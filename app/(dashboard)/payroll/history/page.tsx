import React from "react";
import { getAuthCookies } from "@/lib/server/api";
import { PayrollHeader } from "../_components/PayrollHeader";
import { PayrollTable } from "../_components/PayrollTable";
import EmployeePayroll from "../_components/EmployePayroll";
import { apiCaller } from "@/lib/auth";
import { Payroll } from "@/types/types";


async function getPayroll({ year }: { year: number }) {
  try {
    const res = await apiCaller.get<Payroll[]>("/api/payroll_app/payrolls/", {
      headers: getAuthCookies(),
      params: {
        year: year,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(`Error getPayroll: ${err}`);
  }
}

const PayrollHistoryPage = async ({
  searchParams,
}: {
  searchParams: any;
}): Promise<React.ReactNode> => {
  const year = searchParams.year;
  const showPayrollHistory: boolean = searchParams.hasOwnProperty("payroll-history");
  const payrollData: Payroll[] = await getPayroll({ year });
  return (
    <div className={"container w-full"}>
      <PayrollHeader />
      {!showPayrollHistory ? (
        <div>
          <PayrollTable payrollData={payrollData} />
        </div>
      ) : (
        <div>
          <EmployeePayroll />
        </div>
      )}
    </div>
  );
};

export default PayrollHistoryPage;
