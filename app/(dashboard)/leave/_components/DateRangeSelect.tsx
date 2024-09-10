"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Icons } from "@/components/Icons";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function DateRangeSelect({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  function onDateSelect(date: DateRange | undefined) {
    const params = new URLSearchParams(searchParams);
    if (!date) {
      params.set("date", "");
    } else {
      const fromFormatted = date.from ? format(new Date(date.from), "yyyy-MM-dd") : null;
      const toFormatted = date.to ? format(new Date(date.to), "yyyy-MM-dd") : null;

      if (toFormatted && toFormatted) {
        params.set("date", [fromFormatted, toFormatted].join(","));
      } else {
        params.set("date", "");
      }
    }

    replace(`${pathname}?${params.toString()}`);
    setDate(date);
  }
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start border-none text-left font-normal",
              !date && "text-muted-foreground",
            )}>
            <span className="flex items-center gap-2">
              Dates Requested
              <Icons.listFilter size={15} />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Button variant="ghost" size="sm" onClick={() => onDateSelect(undefined)}>
            Clear
          </Button>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
