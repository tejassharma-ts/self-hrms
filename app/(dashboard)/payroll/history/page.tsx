import React from "react";
// import { getAuthCookies } from "@/lib/server/api";
import { PayrollHeader } from "../_components/PayrollHeader";
import { PayrollTable } from "../_components/PayrollTable";
import EmployeePayroll from "../_components/EmployePayroll";
import { apiCaller } from "@/lib/auth";
import { Payroll } from "@/types/types";
import { cookies } from "next/headers";
import { toast } from "@/hooks/use-toast";

export const dynamic = "force-dynamic";

async function getPayroll({ year, id }: { year: number; id: string }) {
  try {
    const res = await apiCaller.get<Payroll[]>("/api/payroll_app/payrolls/", {
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },

      params: {
        year: year,
        employee_id: id,
      },
    });
    return res.data;
  } catch (err) {
    toast({
      description: "Error getting payroll.",
      variant: "destructive",
    });
    throw new Error(`Error getPayroll: ${err}`);
  }
}

const PayrollHistoryPage = async ({
  searchParams,
}: {
  searchParams: any;
}): Promise<React.ReactNode> => {
  const { year, id } = searchParams;
  const showPayrollHistory: boolean = searchParams.hasOwnProperty("payroll-history");
  const payrollData: any = await getPayroll({ year, id });

  return (
    <div className={"container w-full"}>
      <PayrollHeader payrollData={payrollData?.results?.payrolls} />
      {!showPayrollHistory ? (
        <div>
          <PayrollTable payrollData={payrollData?.results?.payrolls} />
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
