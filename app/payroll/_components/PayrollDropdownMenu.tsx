import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ExpensesDropdownMenuProps {
  placeholder: string;
  values: string[];
}

export const PayrollDropdownMenu = ({ placeholder, values }: ExpensesDropdownMenuProps) => {
  return (
    <>
      <Select>
        <SelectTrigger
          className={cn("h-10 max-w-32 border-none text-3xl font-semibold text-gray-500")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {values.map((value: string) => (
              <SelectItem value={value}>{value}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
