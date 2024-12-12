"use client";
import React, { useState } from "react";
import { cn, formatTime, getMonthNameFromNumber } from "@/lib/utils";
import { attendanceTableHead, days } from "@/app/(dashboard)/my-team/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { EmployeeAttendance } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSelectItems from "@/hooks/use-select-items";
import { Button } from "@/components/ui/button";
import { apiCaller } from "@/lib/auth";
import { Icons } from "@/components/Icons";
import { toast } from "@/hooks/use-toast";

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
  const searchParams = useSearchParams();

  const monthParam = searchParams.get("month");
  let holidaysInMonth: { date: string; name: string }[] = [];

  if (monthParam && holidays[monthParam]) {
    holidaysInMonth = holidays[monthParam].map(
      (eachHoliday: { date: string; name: string; description?: string }) => ({
        date: eachHoliday.date,
        name: eachHoliday.name,
      }),
    );
  }

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
            {holidaysInMonth.map((holiday, index) => (
              <TableRow key={index}>
                <TableCell className="text-nowrap">{holiday.date}</TableCell>
                <TableCell className={"text-center"}>-</TableCell>
                <TableCell className={"text-center"}>-</TableCell>
                <TableCell className="text-nowrap text-amber-700">{holiday.name}</TableCell>
              </TableRow>
            ))}
            {attendance.attendances.map((attendance, index) => (
              <TableRow key={index}>
                <TableCell className="text-nowrap">{attendance.date}</TableCell>
                {attendance.status === "Present" &&
                (!attendance.check_in_time || !attendance.check_out_time) ? (
                  <>
                    <TableCell className="text-nowrap text-center">
                      {formatTime(attendance?.check_in_time) || "Not Marked"}
                    </TableCell>
                    <TableCell className="text-nowrap text-center">
                      {formatTime(attendance?.check_out_time) || "Not Marked"}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="text-nowrap text-center">
                      {formatTime(attendance?.check_in_time) || "N/A"}
                    </TableCell>
                    <TableCell className="text-nowrap text-center">
                      {formatTime(attendance?.check_out_time) || "N/A"}
                    </TableCell>
                  </>
                )}

                <TableCell className="text-nowrap">
                  {attendance.status ? (
                    <div
                      className={cn(
                        "text-[#00000080]",
                        attendance.status === "Present" && "text-green-500",
                        attendance.status === "Absent" && "text-red-500",
                      )}>
                      {attendance.status}
                    </div>
                  ) : (
                    <span
                      className={cn(
                        "text-[#00000080]",
                        attendance.status === "Present" &&
                          attendance.check_in_time &&
                          attendance.check_out_time
                          ? "text-green-500"
                          : attendance.status === "Absent"
                            ? "text-red-500"
                            : "text-black",
                      )}>
                      {attendance.status}
                    </span>
                  )}
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
  const searchParams = useSearchParams();
  const { refresh } = useRouter();
  const params = useParams();
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  const { selectedItems, handleSelectChange, isOptionSelected, clearSelectedItems } =
    useSelectItems();

  const monthParam = searchParams.get("month");
  let h: { name: string; date: number }[] = [];

  if (monthParam) {
    h = (holidays[monthParam] || []).map((eachHoliday: any) => ({
      name: eachHoliday.name,
      date: new Date(eachHoliday.date).getDate(),
    }));
  }

  const getAttendanceForDate = (date: number) => {
    return attendance.attendances.find((att) => parseInt(att.date.split("-")[2]) === date);
  };

  const monthName = getMonthNameFromNumber(month);

  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  const daysInMonth = new Date(year, month, 0).getDate();

  async function performBulkAction(status: "Present" | "Absent") {
    try {
      setBulkActionLoading(true);
      const attendances = selectedItems.map((date) => ({
        date,
        check_in_time: null,
        check_out_time: null,
        status,
        lat: null,
        long: null,
      }));

      await apiCaller.post("/api/companies-app/attendance/employee-create/", {
        employee_id: params.employeeId,
        attendances,
      });

      clearSelectedItems();
      refresh();
    } catch (err) {
      toast({
        title: "Something went wrong.",
        description: `${err}`,
      });
    } finally {
      setBulkActionLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div className="text-base font-bold text-[#585757]">
          {monthName}, {year}
        </div>
        {selectedItems.length ? (
          <div className="flex items-center space-x-4">
            <Button
              disabled={bulkActionLoading}
              size="sm"
              onClick={() => performBulkAction("Present")}>
              {bulkActionLoading ? <Icons.loader /> : null}
              Bulk Approve
            </Button>
            <Button
              disabled={bulkActionLoading}
              size="sm"
              onClick={() => performBulkAction("Absent")}
              variant="destructive">
              {bulkActionLoading ? <Icons.loader /> : null}
              Bulk Decline
            </Button>
          </div>
        ) : null}
      </div>
      <div className="grid grid-cols-7 rounded-t-md border text-center text-xs font-medium text-black">
        {days.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      <div className="rounded-b-md border-b border-l border-r">
        <div className="grid grid-cols-7">
          {[...Array(firstDayOfMonth)].map((_, index) => (
            <div key={index} className="h-32 cursor-not-allowed border-b border-r bg-gray-100" />
          ))}

          {[...Array(daysInMonth)].map((_, index) => {
            const date = index + 1;
            const attendanceForDate = getAttendanceForDate(date);
            const currentIndex = index + firstDayOfMonth;
            const isFirstColumn = currentIndex % 7 === 0;
            const isLastColumn = (currentIndex + 1) % 7 === 0;
            const holidayForDate = h.find((holiday) => holiday.date === date);

            const isFutureDate = month === new Date().getMonth() + 1 && date > new Date().getDate();
            const formatedDate = `${year}-${month}-${date}`;
            return (
              <div
                key={`date-${index}`}
                className={cn(
                  "relative flex h-32 w-full items-center justify-center border-b border-r px-5 py-2",
                  attendanceForDate?.status === "Absent" ? "bg-[#FFEBEB]" : "",
                  isFirstColumn && "border-l-0",
                  isLastColumn && "border-r-0",
                )}>
                <p className="absolute left-2 top-2 text-xs font-medium text-black">{date}</p>
                {holidayForDate ? (
                  <span className="w-full text-center text-xs font-semibold text-amber-700">
                    {holidayForDate.name}
                    {attendanceForDate?.status === "Present" ? (
                      <h1 className="text-base font-semibold text-green-500">
                        {attendanceForDate.status}
                      </h1>
                    ) : !isFutureDate ? (
                      <Checkbox
                        className="absolute right-2 top-2"
                        checked={isOptionSelected(formatedDate)}
                        onCheckedChange={() => handleSelectChange(formatedDate)}
                      />
                    ) : null}
                  </span>
                ) : attendanceForDate ? (
                  attendanceForDate.status === "Absent" ? (
                    <span className="bg-inherit text-base font-semibold text-red-500">Absent</span>
                  ) : (attendanceForDate.status === "Present" && attendanceForDate.check_in_time) ||
                    attendanceForDate.check_out_time ? (
                    <p className="absolute bottom-0 flex gap-x-4 whitespace-nowrap pb-2 text-xs font-semibold">
                      <span className="text-center text-green-500">
                        In <br /> {formatTime(attendanceForDate?.check_in_time)}
                      </span>
                      <span className="text-center text-red-500">
                        Out <br />
                        {attendanceForDate?.check_out_time
                          ? formatTime(attendanceForDate?.check_out_time)
                          : "Not Marked"}
                      </span>
                    </p>
                  ) : attendanceForDate.status === "Half Day" ? (
                    <span className="text-lg font-semibold text-[#00000080]">Half Day</span>
                  ) : attendanceForDate.status === "On Leave" ? (
                    <span className="text-lg font-semibold text-[#00000080]">On Leave</span>
                  ) : (
                    <h1 className="text-base font-semibold text-green-500">
                      {attendanceForDate.status}
                    </h1>
                  )
                ) : (
                  <p className="mt-auto flex gap-x-4 pb-2 text-xs font-medium text-muted-foreground">
                    <span>Not Marked</span>
                    {!isFutureDate ? (
                      <Checkbox
                        className="absolute right-2 top-2"
                        checked={isOptionSelected(formatedDate)}
                        onCheckedChange={() => handleSelectChange(formatedDate)}
                      />
                    ) : null}
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
