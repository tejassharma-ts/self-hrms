"use client";

import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { MeetingDetailsTab } from "@/app/(dashboard)/dashboard/_components/MeetingDetailsTab";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  startOfWeek,
  eachDayOfInterval,
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  setDate,
} from "date-fns";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { YearMonthSelector } from "./YearMonthSelector";

export default function MeetingCard({ className }: { className: string }) {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(format(currentDate, "yyyy-MM-dd"));
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);

  const getDatesPerWeekForCurrentMonth = useCallback(() => {
    const today = new Date(selectedYear, selectedMonth - 1);
    const firstDayOfMonth = startOfMonth(today); // Date Tue Oct 01 2024 00:00:00 GMT+0530 (India Standard Time)
    const lastDayOfMonth = endOfMonth(today); // Date Thu Oct 31 2024 23:59:59 GMT+0530 (India Standard Time)

    const result = [];
    let currentWeekStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 }); // Date Sun Sep 29 2024 00:00:00 GMT+0530 (India Standard Time) }

    while (currentWeekStart <= lastDayOfMonth) {
      const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 0 }); // Date Sat Oct 5 2024 00:00:00 GMT+0530 (India Standard Time) }

      const weekDates = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd })
        .filter((date) => isSameMonth(date, today))
        .map((date) => format(date, "dd EEE"));

      if (weekDates.length > 0) {
        result.push(weekDates);
      }

      currentWeekStart = addDays(currentWeekEnd, 1);
    }

    return result;
  }, [selectedMonth, selectedYear]);

  function handleDateClick(currDate: string) {
    const selectedDate = new Date(selectedYear, selectedMonth - 1);
    const targetDate = setDate(selectedDate, parseInt(currDate, 10));
    const formattedDate = format(targetDate, "yyyy-MM-dd");
    setSelectedDate(formattedDate);
  }

  return (
    <Card className={cn("relative flex flex-col overflow-hidden", className)}>
      <CardHeader>
        <YearMonthSelector
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          setSelectedYear={(year: number) => {
            setSelectedYear(year);
            setSelectedDate("");
          }}
          setSelectedMonth={(month: number) => {
            setSelectedMonth(month);
            setSelectedDate("");
          }}
        />
      </CardHeader>
      <CardContent className="flex h-full flex-col">
        <Carousel className="px-5">
          <CarouselContent>
            {getDatesPerWeekForCurrentMonth().map((week) =>
              week.map((day, idx) => {
                const [currDate, currDay] = day.split(" ");
                return (
                  <CarouselItem className="basis-[25%]">
                    <Card
                      key={idx}
                      onClick={() => handleDateClick(currDate)}
                      className={cn(
                        "inline-flex justify-center hover:bg-gray-200",
                        selectedDate.split("-")[2] === currDate && "bg-black hover:bg-black",
                      )}>
                      <CardContent
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-between p-4 text-gray-500",
                          selectedDate.split("-")[2] === currDate && "text-white",
                        )}>
                        <p className="text-sm font-semibold">{currDay}</p>
                        <p className="mt-2 text-sm font-semibold">{currDate}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              }),
            )}
          </CarouselContent>
          <CarouselPrevious className="-left-5" variant="ghost" />
          <CarouselNext className="-right-5" variant="ghost" />
        </Carousel>
        <MeetingDetailsTab selectedDate={selectedDate} className="relative h-full" />
      </CardContent>
    </Card>
  );
}
