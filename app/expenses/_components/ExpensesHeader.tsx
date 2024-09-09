import React from "react";

import { ExpensesStatusFilter } from "@/app/expenses/_components/ExpensesStatusFilter";
import { ExpenseCard } from "@/app/expenses/_components/ExpenseCard";

export const ExpensesHeader = (): React.ReactNode => {
  return (
    <>
      <div className={"mb-10 grid grid-cols-4 gap-4"}>
        <ExpenseCard heading={"Expenses this month"} money={"2,34,764.25"} />
        <ExpenseCard heading={"In hand expense"} money={"10,249.25"} />
        <ExpenseCard isLast heading={"Balance this month"} money={"58,76,445.25"} />
        <div className={"col-span-1 mx-auto"}>
          <ExpensesStatusFilter />
        </div>
      </div>
    </>
  );
};
