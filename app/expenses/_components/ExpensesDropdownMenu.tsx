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
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  placeholder: string;
  values: string[];
}

export const ExpensesDropdownMenu = ({
  isOpen,
  setIsOpen,
  placeholder,
  values,
}: ExpensesDropdownMenuProps): React.ReactNode => {
  return (
    <>
      <Select onOpenChange={(open) => setIsOpen(open)}>
        <SelectTrigger
          className={cn(
            "h-8 w-28 rounded-full border border-black text-center transition-colors duration-200",
            isOpen ? "bg-black text-white" : "bg-white text-black",
          )}>
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
