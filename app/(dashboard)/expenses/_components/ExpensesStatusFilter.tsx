"use client";
import * as React from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const expensesStatusValues = ["credited", "pending", "rejected"];

export const ExpensesStatusFilter = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const placeholder: string = "filter";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleValueChange = (value: string): void => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (value !== "") {
      current.set("status", value === "credited" ? "approved" : value);
    } else {
      current.delete("status");
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  };

  return (
    <Select onValueChange={handleValueChange} onOpenChange={(open) => setIsOpen(open)}>
      <SelectTrigger
        className={cn(
          "h-8 w-28 rounded-full border border-black text-center transition-colors duration-200",
          isOpen ? "bg-black text-white" : "bg-white text-black",
        )}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {expensesStatusValues.map((value: string) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
