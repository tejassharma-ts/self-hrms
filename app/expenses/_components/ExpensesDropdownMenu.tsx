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
}: ExpensesDropdownMenuProps) => {
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
            {/*<SelectItem value="February">February</SelectItem>*/}
            {/*<SelectItem value="March">March</SelectItem>*/}
            {/*<SelectItem value="April">April</SelectItem>*/}
            {/*<SelectItem value="May">May</SelectItem>*/}
            {/*<SelectItem value="June">June</SelectItem>*/}
            {/*<SelectItem value="July">July</SelectItem>*/}
            {/*<SelectItem value="August">August</SelectItem>*/}
            {/*<SelectItem value="September">September</SelectItem>*/}
            {/*<SelectItem value="October">October</SelectItem>*/}
            {/*<SelectItem value="November">November</SelectItem>*/}
            {/*<SelectItem value="December">December</SelectItem>*/}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
