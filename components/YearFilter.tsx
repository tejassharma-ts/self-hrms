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
import { yearValues } from "@/app/(dashboard)/expenses/_data/filterDataValues";

type YearFilterProps = {
  year?: number;
};

export const YearFilter = ({ year }: YearFilterProps): React.ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const placeholder: string = "Year";

  useEffect(() => {
    if (year && !searchParams.get("year")) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("year", year.toString());

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.replace(`${pathname}${query}`);
    }
  }, [year, pathname, router, searchParams]);

  const handleValueChange = (value: string): void => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (value !== "") {
      current.set("year", value);
    } else {
      current.delete("year");
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  };
  return (
    <Select
      onValueChange={handleValueChange}
      onOpenChange={(open) => setIsOpen(open)}
      defaultValue={year?.toString() || ""}>
      <SelectTrigger
        className={cn(
          "h-8 w-28 rounded-full border border-black text-center transition-colors duration-200",
          isOpen ? "bg-black text-white" : "bg-white text-black",
        )}>
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
