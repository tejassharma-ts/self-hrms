"use client";
import * as React from "react";
import { useState } from "react";
import { ExpensesDropdownMenu } from "../_components/ExpensesDropdownMenu";
import { monthValues } from "../_data/DummyExpensesMonthFilterData";

export const ExpensesMonthFilter = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const placeholder: string = "Month";

  return (
    <ExpensesDropdownMenu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      placeholder={placeholder}
      values={monthValues}
    />
  );
};
