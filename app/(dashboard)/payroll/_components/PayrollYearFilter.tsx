"use client";
import * as React from "react";
import { PayrollYearDummyData } from "../_data/PayrollYearDummyData";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const PayrollYearFilter = (): React.ReactNode => {
  const router = useRouter();
  const placeholder: number = 2024;

  const handleValueSelect = (value: string) => {
    router.push(`/payroll/?year=${value}`);
  };

  return (
    <Select onValueChange={handleValueSelect}>
      <SelectTrigger
        className={cn("h-10 max-w-32 border-none text-3xl font-semibold text-gray-500")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {PayrollYearDummyData.map((value: string) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
