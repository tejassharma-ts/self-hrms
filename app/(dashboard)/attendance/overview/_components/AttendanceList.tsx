"use client";

import React, { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Attendance } from "@/types/types";
import { formatTime, getFullName } from "@/lib/utils";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type AttendanceListProps = {
  attendances: any;
};

export default function AttendanceList({ attendances }: AttendanceListProps) {
  const [date, setDate] = useState<Date>(new Date());
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  if (!attendances) {
    return <h1>Opps</h1>;
  }

  function onDateSelect(date: Date | undefined) {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      const params = new URLSearchParams(searchParams);
      params.set("date", formattedDate);
      replace(`${pathname}?${params.toString()}`);
      setDate(date);
    }
  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Attendance List</h1>
      <Popover>
        <PopoverTrigger asChild className="mb-4 mt-5">
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start rounded-sm text-left font-normal bg-white",
              !date && "text-muted-foreground",
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={onDateSelect} initialFocus />
        </PopoverContent>
      </Popover>
      {/* <p className="mb-4 text-sm text-gray-500">Date- {new Date().toLocaleDateString()}</p> */}

      <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-white">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="">Employee ID</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Department</TableHead>
              <TableHead className="">Log In Time</TableHead>
              <TableHead className="">Log Out Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendances.employees.map((employee: any) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id.replaceAll("-", " ")}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {getFullName(employee.first_name, employee.last_name)}
                </TableCell>
                <TableCell>{employee.department.depart_name}</TableCell>
                <TableCell className="text-green-500">
                  {formatTime(employee.check_in_time) || "-"}
                </TableCell>
                <TableCell className="text-red-500">
                  {formatTime(employee.check_out_time) || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
