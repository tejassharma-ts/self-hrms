"use client";
import React, { useState } from "react";
import { cn, formatTime, getMonthNameFromNumber } from "@/lib/utils";
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

const ThreeDotsIcon = () => (
  <svg
    width="4"
    height="13"
    viewBox="0 0 4 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-2 top-2">
    <path
      d="M3.67853 1.61514C3.67853 2.50716 2.9554 3.23028 2.06338 3.23028C1.17137 3.23028 0.448242 2.50716 0.448242 1.61514C0.448242 0.723124 1.17137 0 2.06338 0C2.9554 0 3.67853 0.723124 3.67853 1.61514Z"
      fill="#C5C6D0"
    />
    <path
      d="M3.67853 6.46057C3.67853 7.35259 2.9554 8.07571 2.06338 8.07571C1.17137 8.07571 0.448242 7.35259 0.448242 6.46057C0.448242 5.56855 1.17137 4.84543 2.06338 4.84543C2.9554 4.84543 3.67853 5.56855 3.67853 6.46057Z"
      fill="#C5C6D0"
    />
    <path
      d="M2.06338 12.9211C2.9554 12.9211 3.67853 12.198 3.67853 11.306C3.67853 10.414 2.9554 9.69085 2.06338 9.69085C1.17137 9.69085 0.448242 10.414 0.448242 11.306C0.448242 12.198 1.17137 12.9211 2.06338 12.9211Z"
      fill="#C5C6D0"
    />
  </svg>
);

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
  const [showActionDropdown, setShowActionDropdown] = useState<boolean>(false);

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

  console.log(holidaysInMonth);

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
                      {formatTime(attendance?.check_in_time) || "N/A"}
                    </TableCell>
                    <TableCell className="text-nowrap text-center">
                      {formatTime(attendance?.check_out_time) || "N/A"}
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
                  {attendance.status === "Present" &&
                  (!attendance.check_in_time || !attendance.check_out_time) ? (
                    <div className={"relative"}>
                      <button
                        onClick={() => setShowActionDropdown(!showActionDropdown)}
                        className={"text-[#0085FF]"}>
                        Take Action
                      </button>
                      {showActionDropdown && (
                        <div
                          className={
                            "absolute right-0 z-10 flex h-[65px] w-[106px] flex-col items-center justify-around rounded-lg border border-gray-100 bg-white"
                          }>
                          <p className={"text-xs text-[#3BA53B]"}>Mark Present</p>
                          <p className={"text-xs text-[#D9282B]"}>Mark Absent</p>
                        </div>
                      )}
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
  const [showActionDropdown, setShowActionDropdown] = useState<boolean>(false);

  const monthParam = searchParams.get("month");
  let holidaysInMonth: any[] = [];

  monthParam &&
    holidays[monthParam]?.map((eachHoliday: any) => {
      holidaysInMonth.push(new Date(eachHoliday.date).getDate(), eachHoliday.name);
    });

  const getAttendanceForDate = (date: number) => {
    return attendance.attendances.find((att) => parseInt(att.date.split("-")[2]) === date);
  };

  const getHoliday = (date: number) => {
    return holidaysInMonth[0] === date && holidaysInMonth;
  };

  const monthName = getMonthNameFromNumber(month);

  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  const daysInMonth = new Date(year, month, 0).getDate();

  return (
    <div>
      <div className="mb-10 text-base font-bold text-[#585757]">
        {monthName}, {year}
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
            const holiday = getHoliday(date);
            const attendanceForDate = getAttendanceForDate(date);
            const currentIndex = index + firstDayOfMonth;
            const isFirstColumn = currentIndex % 7 === 0;
            const isLastColumn = (currentIndex + 1) % 7 === 0;

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
                {holiday && holiday[0] === date ? (
                  <span className="w-full text-nowrap text-center text-xs font-semibold text-amber-700">
                    {holiday[1]}
                  </span>
                ) : attendanceForDate ? (
                  attendanceForDate.status === "Absent" ? (
                    <span className="bg-inherit text-lg font-semibold text-red-500">Absent</span>
                  ) : attendanceForDate.status === "Present" &&
                    attendanceForDate.check_in_time &&
                    attendanceForDate.check_out_time ? (
                    <p className="absolute bottom-0 flex gap-x-4 pb-2 text-[9px] font-medium">
                      <span className="text-center text-green-500">
                        In <br /> {formatTime(attendanceForDate?.check_in_time)}
                      </span>
                      <span className="text-center text-red-500">
                        Out <br /> {formatTime(attendanceForDate?.check_out_time)}
                      </span>
                    </p>
                  ) : (attendanceForDate.status === "Present" &&
                      !attendanceForDate.check_in_time) ||
                    !attendanceForDate.check_out_time ? (
                    <div className={"absolute h-full w-full"}>
                      <div className={"absolute right-0 top-0"}>
                        <div className={"relative"}>
                          <button onClick={() => setShowActionDropdown(!showActionDropdown)}>
                            <ThreeDotsIcon />
                          </button>

                          {showActionDropdown && (
                            <div
                              className={
                                "absolute right-2 top-8 z-10 flex h-[65px] w-[106px] flex-col items-center justify-around rounded-lg border border-gray-100 bg-white"
                              }>
                              <p className={"text-xs text-[#3BA53B]"}>Mark Present</p>
                              <p className={"text-xs text-[#D9282B]"}>Mark Absent</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="absolute left-3 top-1/2 text-nowrap text-xs font-medium">
                        <span className="rounded bg-[#0085FF1A] p-2 text-center text-[#0085FF]">
                          Take Action
                        </span>
                      </p>
                    </div>
                  ) : attendanceForDate.status === "Half Day" ? (
                    <span className="text-lg font-semibold text-[#00000080]">Half Day</span>
                  ) : attendanceForDate.status === "On Leave" ? (
                    <span className="text-lg font-semibold text-[#00000080]">On Leave</span>
                  ) : (
                    ""
                  )
                ) : (
                  <p className="absolute bottom-0 flex gap-x-4 pb-2 text-[9px] font-medium">
                    <span className="px-2 text-green-500">N/A</span>
                    <span className="px-2 text-red-500">N/A</span>
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
