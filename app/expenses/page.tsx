import React from "react";
import { ExpensesHeader } from "@/app/expenses/_components/ExpensesHeader";
import { ExpensesMonthFilter } from "@/app/expenses/_components/ExpensesMonthFilter";
import { ExpensesYearFilter } from "@/app/expenses/_components/ExpensesYearFilter";
import { ExpensesEmployeeTable } from "@/app/expenses/_components/ExpensesEmployeeTable";

const Page = (): React.ReactNode => {
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
            <ExpensesEmployeeTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
