import React from "react";
import { SpendExpensesTable } from "@/app/(dashboard)/expenses/[employeeId]/_components/SpendExpensesTable";
import { SpendExpensesHeader } from "@/app/(dashboard)/expenses/[employeeId]/_components/SpendExpensesHeader";
import { apiCaller } from "@/lib/auth";
import { getAuthCookies } from "@/lib/server/api";
import { Expenses } from "@/app/(dashboard)/expenses/page";
import { SpendExpensesYearFilter } from "@/app/(dashboard)/expenses/[employeeId]/_components/SpendExpensesYearFilter";
import { SpendExpensesMonthFilter } from "@/app/(dashboard)/expenses/[employeeId]/_components/SpendExpensesMonthFilter";
import { getMonthNumber } from "@/lib/utils";

type params = {
  employeeId: string;
};

interface getEmployeeSpendDataProps {
  employeeId: string;
  status: string;
  month: number;
  year: number;
}

async function getEmployeeSpendData({
  employeeId,
  status,
  month,
  year,
}: getEmployeeSpendDataProps): Promise<Expenses[]> {
  try {
    const res = await apiCaller.get<Expenses[]>("/api/payroll_app/expenses-details/", {
      headers: getAuthCookies(),
      params: {
        employee_id: employeeId,
        approval_status: status,
        month,
        year,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error("Error getting employee spend data.");
  }
}

const EmployeePage = async ({
  params,
  searchParams,
}: {
  params: params;
  searchParams: any;
}): Promise<React.ReactNode> => {
  const status = searchParams.status;
  const month = searchParams.month;
  const monthNumber = getMonthNumber(month);
  const year = searchParams.year;
  const employeeId = params.employeeId;
  const employeeSpendData: Expenses[] = await getEmployeeSpendData({
    employeeId,
    status,
    month: monthNumber,
    year,
  });

  return (
    <section>
      {!status && (
        <SpendExpensesHeader employeeSpendData={employeeSpendData} employeeId={employeeId} />
      )}
      <div className={"grid grid-cols-4"}>
        <div className={"col-span-3 flex-col"}>
          <div className={"mb-10 flex items-center justify-between gap-x-4"}>
            <h2 className={"text-xl font-semibold"}>
              {status === "approved"
                ? "Approved"
                : status === "pending"
                  ? "Pending"
                  : status === "rejected"
                    ? "Declined"
                    : "Spend"}{" "}
              Expenses
            </h2>
            <div className={"flex items-center gap-x-4"}>
              <SpendExpensesMonthFilter />
              <SpendExpensesYearFilter />
            </div>
          </div>
          <div>
            <SpendExpensesTable spendExpensesData={employeeSpendData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeePage;
