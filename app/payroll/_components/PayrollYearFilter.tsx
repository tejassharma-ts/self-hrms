"use client";
import * as React from "react";
import { PayrollYearDummyData } from "@/app/payroll/_data/PayrollYearDummyData";
import { PayrollDropdownMenu } from "@/app/payroll/_components/PayrollDropdownMenu";

export const PayrollYearFilter = (): React.ReactNode => {
  const placeholder: string = "2024";

  return <PayrollDropdownMenu placeholder={placeholder} values={PayrollYearDummyData} />;
};
