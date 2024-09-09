"use client";
import * as React from "react";
import { useState } from "react";
import { ExpensesDropdownMenu } from "@/app/expenses/_components/ExpensesDropdownMenu";
import { statusValues } from "@/app/expenses/_data/DummyExpensesStatusFilterData";

export const ExpensesStatusFilter = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const placeholder: string = "filter";

  return (
    <ExpensesDropdownMenu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      placeholder={placeholder}
      values={statusValues}
    />
  );
};
