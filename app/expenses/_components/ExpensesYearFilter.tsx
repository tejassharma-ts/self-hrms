"use client";
import * as React from "react";
import { useState } from "react";
import { ExpensesDropdownMenu } from "@/app/expenses/_components/ExpensesDropdownMenu";
import { yearValues } from "@/app/expenses/_data/DummyExpensesYearFilterData";

export const ExpensesYearFilter = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const placeholder: string = "Year";
  return (
    <ExpensesDropdownMenu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      placeholder={placeholder}
      values={yearValues}
    />
  );
};
