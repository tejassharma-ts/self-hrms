"use client";
import * as React from "react";
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
import { yearValues } from "@/app/(dashboard)/expenses/_data/filterDataValues";

export const PayrollYearFilter = (): React.ReactNode => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleValueChange = (value: string): void => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (value !== "") {
      current.set("year", value);
    } else {
      current.delete("year");
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const placeholder: number = 2024;

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger
        className={cn("h-10 max-w-32 border-none text-3xl font-semibold text-gray-500")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {yearValues.map((value: string) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
