import React from "react";

import { StatusFilter } from "@/components/StatusFilter";
import { ExpenseCard } from "../_components/ExpenseCard";

interface IExpensesHeaderProps {
  totalExpenses: number;
  pendingExpenses: number;
  approvedExpenses: number;
}

export const ExpensesHeader = ({
  totalExpenses,
  pendingExpenses,
  approvedExpenses,
}: IExpensesHeaderProps): React.ReactNode => {
  return (
    <>
      <div className={"mb-10 grid grid-cols-4 gap-4"}>
        <ExpenseCard heading={"Pending Expenses"} money={`${pendingExpenses}`} />
        <ExpenseCard heading={"Approved Expenses"} money={`${approvedExpenses}`} />
        <ExpenseCard isLast heading={"Total Expenses"} money={`${totalExpenses}`} />
        <div className={"col-span-1 mx-auto"}>
          <StatusFilter />
        </div>
      </div>
    </>
  );
};
