"use client";

import { type CarouselApi } from "@/components/ui/carousel";
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
import { DayPicker } from "react-day-picker";

export default function MeetingCard({ className }: { className: string }) {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(format(currentDate, "yyyy-MM-dd"));
  const [currentMonthYear, setCurrentMonthYear] = useState(new Date());
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("init", () => {
      api.scrollTo(currentDate.getDate() - 1);
    });
  }, [api]);

  const getDatesPerWeekForCurrentMonth = useCallback(() => {
    const year = currentMonthYear.getFullYear();
    const month = currentMonthYear.getMonth();
    const today = new Date(year, month);
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
  }, [currentMonthYear]);

  function handleDateClick(currDate: string) {
    const year = currentMonthYear.getFullYear();
    const month = currentMonthYear.getMonth();
    const selectedDate = new Date(year, month);
    const targetDate = setDate(selectedDate, parseInt(currDate, 10));
    const formattedDate = format(targetDate, "yyyy-MM-dd");
    setSelectedDate(formattedDate);
  }

  return (
    <Card className={cn("relative flex flex-col overflow-hidden rounded-2xl", className)}>
      <CardHeader className="pb-2 pt-4">
        <DayPicker
          month={currentMonthYear}
          onMonthChange={setCurrentMonthYear}
          classNames={{
            caption: "flex justify-center relative bg-[#f8f8f9] py-2.5 rounded-xl",
            caption_label: "font-semibold text-lg",
            nav_button: "size-7 bg-white shadow-sm rounded-full flex justify-center items-center",
            nav_icon: "size-2.5",
            nav_button_previous: "absolute left-4 top-1/2 -translate-y-1/2",
            nav_button_next: "absolute right-4 top-1/2 -translate-y-1/2",
          }}
          components={{
            Row(props) {
              return null;
            },
            HeadRow() {
              return null;
            },
          }}
        />
      </CardHeader>
      <CardContent className="flex h-full flex-col pt-0">
        <Carousel setApi={setApi} className="mx-4">
          <CarouselContent>
            {getDatesPerWeekForCurrentMonth().map((week) =>
              week.map((day, idx) => {
                const [currDate, currDay] = day.split(" ");
                return (
                  <CarouselItem className="basis-[4.5rem] pl-0">
                    <Card
                      key={idx}
                      onClick={() => handleDateClick(currDate)}
                      className={cn(
                        "inline-flex w-[4rem] justify-center rounded-2xl shadow-none hover:bg-gray-200",
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
          <CarouselPrevious
            className="-left-8 flex size-7 items-center justify-center rounded-full bg-white shadow-lg"
            variant="ghost"
          />
          <CarouselNext
            className="-right-8 flex size-7 items-center justify-center rounded-full bg-white shadow-lg"
            variant="ghost"
          />
        </Carousel>
        <MeetingDetailsTab selectedDate={selectedDate} />
      </CardContent>
    </Card>
  );
}
