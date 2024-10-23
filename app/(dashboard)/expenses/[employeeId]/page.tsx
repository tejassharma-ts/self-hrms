import React from "react";
import { SpendExpensesTable } from "@/app/(dashboard)/expenses/[employeeId]/_components/SpendExpensesTable";
import { SpendExpensesHeader } from "@/app/(dashboard)/expenses/[employeeId]/_components/SpendExpensesHeader";
import { apiCaller } from "@/lib/auth";
// import { getAuthCookies } from "@/lib/server/api";
import { getMonthNumber } from "@/lib/utils";
import { IPayrollExpenseDetails } from "@/types/types";
import { MonthFilter } from "@/components/MonthFilter";
import { YearFilter } from "@/components/YearFilter";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { ArrowLeftFromLine, ChevronLeft } from "lucide-react";

interface IExpensesSearchParams {
  status: string;
  month: string;
  year: number;
}

interface IGetEmployeeSpendDataProps {
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
}: IGetEmployeeSpendDataProps): Promise<IPayrollExpenseDetails[]> {
  try {
    const updatedMonth = month === 0 ? null : month;
    const res = await apiCaller.get<IPayrollExpenseDetails[]>(
      "/api/payroll_app/expenses-details/",
      {
        headers: {
          Cookie: cookies()
            .getAll()
            .map(({ name, value }) => `${name}=${value}`)
            .join("; "),
        },
        params: {
          employee_id: employeeId,
          approval_status: status,
          month: updatedMonth,
          year,
        },
      },
    );
    return res.data;
  } catch (err) {
    throw new Error("Error getting employee spend data.");
  }
}

const EmployeePage = async ({
  params,
  searchParams,
}: {
  params: { employeeId: string };
  searchParams: IExpensesSearchParams;
}): Promise<React.ReactNode> => {
  const { month, year, status } = searchParams;
  const monthNumber = month && getMonthNumber(month);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const updatedMonth = monthNumber ? monthNumber : currentMonth + 1;
  const updatedYear = year ? year : currentYear;
  const { employeeId } = params;

  const employeeSpendData: IPayrollExpenseDetails[] = await getEmployeeSpendData({
    employeeId,
    status,
    month: updatedMonth,
    year: updatedYear,
  });

  return (
    <section>
      {!status && (
        <SpendExpensesHeader employeeSpendData={employeeSpendData} employeeId={employeeId} />
      )}

      <div className={"flex-col"}>
        <div className={"mb-10 flex items-center justify-between gap-x-4"}>
          <Link href={"/expenses"} className="mb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild >
                  <Button variant="ghost" className="hover:bg-gray-700 hover:text-white">
                    <ChevronLeft />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Back to Expenses</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
          <h2 className={"text-xl font-semibold"}>
            {status === "approved"
              ? "Approved"
              : status === "pending"
                ? "Pending"
                : status === "rejected"
                  ? "Declined"
                  : ""}{" "}
            Expenses Record
          </h2>
          <div className={"flex items-center gap-x-4"}>
            <MonthFilter />
            <YearFilter />
          </div>
        </div>
        <div>
          <SpendExpensesTable spendExpensesData={employeeSpendData} />
        </div>
      </div>
    </section>
  );
};

export default EmployeePage;
