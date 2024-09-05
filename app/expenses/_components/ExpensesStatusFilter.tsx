"use client";
import * as React from "react";
import { useState } from "react";
import { ExpensesDropdownMenu } from "@/app/expenses/_components/ExpensesDropdownMenu";

export const ExpensesStatusFilter = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const placeholder: string = "filter";
  const values: string[] = ["Approved", "Pending", "Rejected"];

  return (
    <ExpensesDropdownMenu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      placeholder={placeholder}
      values={values}
    />
  );
};
