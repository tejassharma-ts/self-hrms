"use client";

import React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

import { MeetingDetailsTab } from "@/app/(dashboard)/dashboard/_components/MeetingDetailsTab";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { startOfWeek, eachDayOfInterval, format, addDays, setDate } from "date-fns";

const calendarCarousel: { day: string; date: string }[] = [
  { day: "MON", date: "2" },
  { day: "TUE", date: "3" },
  { day: "WED", date: "4" },
  { day: "THU", date: "5" },
  { day: "FRI", date: "6" },
  { day: "SAT", date: "7" },
];

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split("T")[0];

export default function MeetingCard() {
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const saturday = addDays(start, 5);
  const weekDates = eachDayOfInterval({ start, end: saturday }).map((date) =>
    format(date, "EEEE, d"),
  );

  function handleDateClick(weekDay: string) {
    let currentDate = new Date();

    // TODO: fix typings
    currentDate = setDate(currentDate, weekDay as never as number);
    const formattedDate = format(currentDate, "yyyy-MM-dd");

    setSelectedDate(formattedDate);
  }

  return (
    <div className="relative rounded-xl border">
      <div className="inset-0 flex flex-col p-6">
        <h1 className="border-b border-b-slate-400 pb-2 text-center text-lg font-bold">
          {format(new Date(), "MMMM do, yyyy")}
        </h1>
        <ScrollArea>
          <div className="mt-4 flex space-x-4">
            {weekDates.map((eachDay, index) => {
              const [weekName, weekDay] = eachDay.split(", ");
              return (
                <Card
                  key={index}
                  onClick={() => handleDateClick(weekDay)}
                  className={cn(
                    "inline-flex justify-center hover:bg-gray-200",
                    selectedDate.split("-")[2] === weekDay && "bg-black hover:bg-black",
                  )}>
                  <CardContent
                    className={cn(
                      "flex cursor-pointer flex-col items-center justify-between p-4 text-gray-500",
                      selectedDate.split("-")[2] === weekDay && "text-white",
                    )}>
                    <p className="text-sm font-semibold">{weekName}</p>
                    <p className="mt-2 text-sm font-semibold">{weekDay}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
        <MeetingDetailsTab selectedDate={selectedDate} />
      </div>
    </div>
  );
}
