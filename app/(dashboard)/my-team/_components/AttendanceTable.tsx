"use client";
import React from "react";
import { cn, formatTime, getMonthNameFromNumber } from "@/lib/utils";
import { attendanceTableHead } from "@/app/(dashboard)/my-team/constants";
import { EmployeeAttendance } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchParams } from "next/navigation";

const TableView = ({
  attendance,
  holidays,
  month,
  year,
}: {
  attendance: EmployeeAttendance;
  holidays: any;
  month: number;
  year: number;
}) => {
  const monthName = getMonthNameFromNumber(month);
  return (
    <>
      <div className={"mb-10 text-base font-bold text-[#585757]"}>
        {monthName}, {year}
      </div>
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {attendanceTableHead.map((eachAttendance, index) => (
                <TableHead key={index}>{eachAttendance}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.attendances.map((attendance, index) => (
              <TableRow key={index}>
                <TableCell className="text-nowrap">{attendance.date}</TableCell>
                <TableCell className="text-nowrap">
                  {formatTime(attendance?.check_in_time) || "N/A"}
                </TableCell>
                <TableCell className="text-nowrap">
                  {formatTime(attendance?.check_out_time) || "N/A"}
                </TableCell>
                <TableCell className="text-nowrap">
                  <span
                    className={cn(
                      attendance.status === "Present"
                        ? "text-green-500"
                        : attendance.status === "On Leave" || attendance.status === "Absent"
                          ? "text-red-500"
                          : "text-black",
                    )}>
                    {attendance.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

const CalendarView = ({
  attendance,
  month,
  year,
  holidays,
}: {
  attendance: EmployeeAttendance;
  month: number;
  year: number;
  holidays: any;
}) => {
  // {
  //   October: [
  //     {
  //       name: 'Just A Check',
  //       date: '2024-10-24',
  //       description: 'Checking'
  //     }
  //   ]
  // }
  const getAttendanceForDate = (date: number) => {
    return attendance.attendances.find((att) => parseInt(att.date.split("-")[2]) === date);
  };

  const monthName = getMonthNameFromNumber(month);

  return (
    <div>
      <div className={"mb-10 text-base font-bold text-[#585757]"}>
        {monthName}, {year}
      </div>
      {/*<div className="mb-2 grid grid-cols-7 text-center text-xs text-[#969696]">*/}
      {/*  {days.map((day, index) => (*/}
      {/*    <div key={index}>{day}</div>*/}
      {/*  ))}*/}
      {/*</div>*/}
      <div className={"rounded-md border"}>
        <div className="grid grid-cols-7">
          {[...Array(31)].map((_, index) => {
            const date = index + 1;
            const attendanceForDate = getAttendanceForDate(date);

            const isFirstColumn = index % 7 === 0;
            const isLastColumn = (index + 1) % 7 === 0;
            console.log(attendanceForDate?.status);

            return (
              <div
                key={index}
                className={cn(
                  "relative flex h-32 w-full cursor-pointer items-center justify-center border-b border-r px-5 py-2",
                  attendanceForDate?.status === "Absent" ? "bg-[#FFEBEB]" : "",
                  isFirstColumn && "border-l-0",
                  isLastColumn && "border-r-0",
                  index + 1 >= 29 && "border-b-0",
                )}>
                <p className="absolute left-2 top-2 text-xs font-medium text-gray-400">{date}</p>
                {attendanceForDate ? (
                  attendanceForDate.status === "Absent" ? (
                    <span className={"bg-inherit text-lg font-semibold text-red-500"}>Absent</span>
                  ) : attendanceForDate.status === "Present" ? (
                    <p className="absolute bottom-0 flex gap-x-4 text-nowrap pb-2 text-[8px] font-medium">
                      <span className={"text-green-500"}>
                        {" "}
                        {formatTime(attendanceForDate?.check_in_time)}
                      </span>
                      <span className={"text-red-500"}>
                        {formatTime(attendanceForDate?.check_out_time)}
                      </span>
                    </p>
                  ) : (
                    ""
                  )
                ) : (
                  <p className="absolute bottom-0 flex gap-x-4 pb-2 text-[8px] font-medium">
                    <span className={"px-2 text-green-500"}>N/A</span>
                    <span className={"px-2 text-red-500"}>N/A</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const AttendanceTable = ({
  attendance,
  month,
  year,
  holidays,
}: {
  attendance: EmployeeAttendance;
  month: number;
  year: number;
  holidays: any;
}) => {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");
  return currentView === "table" ? (
    <TableView attendance={attendance} holidays={holidays} month={month} year={year} />
  ) : (
    <CalendarView attendance={attendance} month={month} year={year} holidays={holidays} />
  );
};
