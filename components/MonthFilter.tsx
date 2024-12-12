"use client";
import * as React from "react";
import { useEffect, useState } from "react";
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
import { monthValues } from "@/app/(dashboard)/expenses/_data/filterDataValues";

type MonthFilterProps = {
  month?: string;
};

export const MonthFilter = ({ month }: MonthFilterProps): React.ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const placeholder: string = "Month";

  useEffect(() => {
    if (month && !searchParams.get("month")) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("month", month);

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.replace(`${pathname}${query}`);
    }
  }, [month, pathname, router, searchParams]);

  const handleValueChange = (value: string): void => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (value !== "") {
      current.set("month", value);
    } else {
      current.delete("month");
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  };

  return (
    <Select
      onValueChange={handleValueChange}
      onOpenChange={(open) => setIsOpen(open)}
      defaultValue={month || ""}>
      <SelectTrigger
        className={cn(
          "h-8 w-32 rounded-full border border-black text-center transition-colors duration-200",
          isOpen ? "bg-black text-white" : "bg-white text-black",
        )}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {monthValues.map((value: string) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
