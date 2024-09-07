"use client";
import * as React from "react";
import { useState } from "react";
import { ExpensesDropdownMenu } from "@/app/expenses/_components/ExpensesDropdownMenu";

export const ExpensesMonthFilter = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const placeholder: string = "Month";
  const values: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <ExpensesDropdownMenu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      placeholder={placeholder}
      values={values}
    />
  );
};
