"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { attendanceTableHead, days } from "@/app/(dashboard)/my-team/constants";
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

const TableView = ({ attendance }: { attendance: EmployeeAttendance }) => {
  return (
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
              <TableCell className="text-nowrap">{attendance?.check_in_time || "N/A"}</TableCell>
              <TableCell className="text-nowrap">{attendance?.check_out_time || "N/A"}</TableCell>
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
  );
};

const CalendarView = ({ attendance }: { attendance: EmployeeAttendance }) => {
  const getAttendanceForDate = (date: number) => {
    return attendance.attendances.find((att) => parseInt(att.date.split("-")[2]) === date);
  };

  return (
    <div>
      <div className={"rounded-md border"}>
        <div className="grid grid-cols-7 border-b text-center text-gray-400">
          {days.map((day, index) => (
            <div className={cn(index + 1 === 7 ? "" : "border-r")} key={index}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {[...Array(31)].map((_, index) => {
            const date = index + 1;
            const attendanceForDate = getAttendanceForDate(date);

            const isFirstColumn = index % 7 === 0;
            const isLastColumn = (index + 1) % 7 === 0;

            return (
              <div
                key={index}
                className={cn(
                  "relative flex h-32 w-full cursor-pointer items-center justify-center border-b border-r px-5 py-2",
                  attendanceForDate?.status === "Absent" ? "bg-red-200" : "",
                  isFirstColumn && "border-l-0",
                  isLastColumn && "border-r-0",
                  index + 1 >= 29 && "border-b-0",
                )}>
                <p className="absolute left-2 top-2 text-gray-400">{date}</p>
                {attendanceForDate ? (
                  attendanceForDate.status === "Absent" ? (
                    <span className={"bg-inherit text-lg font-semibold text-red-500"}>Absent</span>
                  ) : (
                    <p className="absolute bottom-0 flex gap-x-4 pb-2 text-sm text-gray-400">
                      <p className={"bg-green-200 text-green-500"}>
                        {attendanceForDate.check_in_time || "N/A"}
                      </p>
                      <p className={"bg-red-200 text-red-500"}>
                        {attendanceForDate.check_out_time || "N/A"}
                      </p>
                    </p>
                  )
                ) : (
                  <p className="absolute bottom-0 flex gap-x-4 pb-2 text-sm text-gray-400">
                    <span className={"bg-green-200 px-2 text-green-500"}>N/A</span>
                    <span className={"bg-red-200 px-2 text-red-500"}>N/A</span>
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

export const AttendanceTable = ({ attendance }: { attendance: EmployeeAttendance }) => {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");
  return currentView === "table" ? (
    <TableView attendance={attendance} />
  ) : (
    <CalendarView attendance={attendance} />
  );
};
