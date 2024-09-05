import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendarcomponent } from "@/components/calendarcomponent";
import { api } from "@/api/api";

type EventsDataApi = {
  [key: string]: {
    date: Date;
    description: string;
    name: string;
  }[];
};

type Event = {
  date: string;
  description: string;
  name: string;
};

export default function CustomCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [events, setEvents] = useState<Event[] | []>([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [2020, 2021, 2022, 2023, 2024, 2045];

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  async function fetchData() {
    try {
      const res = await api.get<EventsDataApi>(
        `api/attendance_app/get-holidays/?year=${selectedYear}&month=${selectedMonth + 1}`,
      );
      let activeMonth = Object.keys(res.data)[0] as string;
      setEvents(res.data[activeMonth] ? res.data[activeMonth] : []);
    } catch (error) {
      console.error("Failed to fetch filtered data:", error);
    }
  }

  const handlePrevious = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNext = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

  return (
    <div>
      <div className="mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full border bg-white text-black hover:bg-white">
              + Add Holidays
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="flex justify-center">Add Holiday</DialogTitle>
              <DialogDescription>
                <div className="">
                  <p className="text-xl font-semibold text-black">Occasion</p>
                  <Input className="mt-2" placeholder="Enter Reason" />
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-5 bg-white">
                <Calendarcomponent />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative flex items-center justify-center space-x-8">
        <button
          onClick={handlePrevious}
          className="flex size-9 items-center justify-center rounded-full border text-lg hover:bg-gray-300">
          <Icons.left className="size-6" />
        </button>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-xl font-semibold text-black">
              {months[selectedMonth]}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-2">
              {months.map((month, index) => (
                <DropdownMenuItem
                  key={month}
                  className="mt-2 rounded-lg bg-white text-[#666666]"
                  onClick={() => setSelectedMonth(index)}>
                  {month}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-xl font-semibold text-black">
              {selectedYear}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-2">
              {years.map((year) => (
                <DropdownMenuItem
                  key={year}
                  className="mt-2 rounded-lg bg-white text-[#666666]"
                  onClick={() => setSelectedYear(year)}>
                  {year}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          onClick={handleNext}
          className="flex size-9 items-center justify-center rounded-full border text-lg hover:bg-gray-300">
          <Icons.right className="size-6" />
        </button>
      </div>

      <div className="mt-10 grid grid-cols-7">
        {Array.from({ length: daysInMonth }).map((_, day) => {
          const date = new Date(selectedYear, selectedMonth, day + 1);
          const formattedDate = date.toLocaleString("sv-SE").split(" ")[0];
          const event = events.find((event) => event.date === formattedDate);

          const isHoliday = event && event.date === formattedDate;
          return (
            <div
              key={day}
              className={cn(
                "relative flex h-32 w-full cursor-pointer items-center justify-center rounded-sm border border-dashed px-5 py-2",
                {
                  "bg-black text-white": isHoliday,
                },
              )}>
              <span className="absolute left-2 top-2">{day + 1}</span>
              {event && <h1 className="text-center font-medium">{event.name}</h1>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
