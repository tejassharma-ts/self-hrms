import React from "react";
import { getAuthCookies } from "@/lib/server/api";
import { ExpensesHeader } from "./_components/ExpensesHeader";
import { MonthFilter } from "@/components/MonthFilter";
import { YearFilter } from "@/components/YearFilter";
import { ExpensesEmployeeTable } from "./_components/ExpensesEmployeeTable";
import { apiCaller } from "@/lib/auth";
import { getMonthNumber } from "@/lib/utils";
import { Expenses } from "@/types/types";
import { cookies } from "next/headers";

type SearchParams = {
  status?: string;
  month?: string;
  year?: number;
};

async function getExpenses(status?: string, month?: number, year?: number): Promise<Expenses> {
  try {
    const res = await apiCaller.get<Expenses>(`/api/payroll_app/expenses/`, {
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
      params: {
        status,
        month,
        year,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error("Error getting the expenses data.");
  }
}

const Page = async ({ searchParams }: { searchParams: SearchParams }): Promise<React.ReactNode> => {
  const { month, year, status } = searchParams;

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const monthNumber = month ? getMonthNumber(month) : undefined;
  const updatedMonth = monthNumber ?? currentMonth + 1;
  const updatedYear = year ? year : currentYear;

  const expensesEmployeeData: Expenses = await getExpenses(status, updatedMonth, updatedYear);

  return (
    <>
      <ExpensesHeader
        totalExpenses={expensesEmployeeData.pending_total + expensesEmployeeData.approved_total}
        pendingExpenses={expensesEmployeeData.pending_total}
        approvedExpenses={expensesEmployeeData.approved_total}
      />
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <div className="mb-10 flex justify-end gap-x-4">
            <MonthFilter />
            <YearFilter />
          </div>
          <div>
            <ExpensesEmployeeTable expensesEmployeeData={expensesEmployeeData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
