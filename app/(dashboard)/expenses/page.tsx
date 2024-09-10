import React from "react";
import { getAuthCookies } from "@/lib/server/api";
import { ExpensesHeader } from "./_components/ExpensesHeader";
import { ExpensesMonthFilter } from "./_components/ExpensesMonthFilter";
import { ExpensesYearFilter } from "./_components/ExpensesYearFilter";
import { ExpensesEmployeeTable } from "./_components/ExpensesEmployeeTable";
import { apiCaller } from "@/lib/auth";

async function getExpenses(): Promise<Expenses[]> {
  try {
    const res = await apiCaller.get("/api/payroll_app/expenses/", {
      headers: getAuthCookies(),
    });
    return res.data;
  } catch (err) {
    throw new Error(`Error getExpenses: ${err}`);
  }
}

type Employee = {
  first_name: string;
  last_name: string;
  profile_picture: string;
  department: string;
  position: string;
};

interface Expenses {
  id: string;
  employee: Employee;
  company: string;
  date_incurred: string;
  amount: string;
  description: string;
  category: string;
  bill: string;
  status: string;
};

const Page = async (): Promise<React.ReactNode> => {
  const expensesEmployeeData: Expenses[] = await getExpenses();
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
