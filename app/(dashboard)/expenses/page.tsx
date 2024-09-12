import React from "react";
import { getAuthCookies } from "@/lib/server/api";
import { ExpensesHeader } from "./_components/ExpensesHeader";
import { ExpensesMonthFilter } from "./_components/ExpensesMonthFilter";
import { ExpensesYearFilter } from "./_components/ExpensesYearFilter";
import { ExpensesEmployeeTable } from "./_components/ExpensesEmployeeTable";
import { apiCaller } from "@/lib/auth";
import { getMonthNumber } from "@/lib/utils";

export type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  department: string;
  position: string;
};

export interface Expenses {
  id: string;
  employee: Employee;
  company: string;
  date_incurred: string;
  amount: string;
  description: string;
  category: string;
  bill: string;
  status: string;
}

interface getExpensesProps {
  status: string;
  month: number | null;
  year: number;
}

async function getExpenses({ status, month, year }: getExpensesProps): Promise<Expenses[]> {
  try {
    const res = await apiCaller.get<Expenses[]>(`/api/payroll_app/expenses/`, {
      headers: getAuthCookies(),
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

const Page = async ({ searchParams }: { searchParams: any }): Promise<React.ReactNode> => {
  const status = searchParams.status;
  const month = searchParams.month;
  const monthNumber = getMonthNumber(month);
  const year = searchParams.year;

  const updatedMonth = monthNumber === 0 ? null : monthNumber;
  const expensesEmployeeData: Expenses[] = await getExpenses({
    status,
    month: updatedMonth,
    year,
  });
  return (
    <>
      <ExpensesHeader />
      <div className={"grid grid-cols-4"}>
        <div className={"col-span-3"}>
          <div className={"mb-10 flex justify-end gap-x-4"}>
            <ExpensesMonthFilter />
            <ExpensesYearFilter />
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
