"use client";

import React, { useEffect, useRef, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { format, parseISO, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import { apiCaller } from "@/lib/auth";
import { YearMonthSelector } from "../../dashboard/_components/YearMonthSelector";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Button } from "@/components/ui/button";

type Attendance = {
  date: string; // e.g., "2024-11-02"
  status: string; // e.g., "Present" or "Absent"
  check_in_time: string | null; // Nullable string
  check_out_time: string | null; // Nullable string
  lat: number | null; // Nullable latitude
  long: number | null; // Nullable longitude
  hours_worked: number | null; // Nullable number
};

type EmployeeReport = {
  name: string;
  department: string;
  position: string;
  employee: string; // Employee email or identifier
  phone_number: string;
  total_hours: number; // Total hours worked
  days_attended: number; // Total days attended
  attendance: Attendance[]; // Array of attendance records
};

type ReportData = {
  from_date: string; // ISO date string, e.g., "2024-11-01"
  to_date: string; // ISO date string, e.g., "2024-11-30"
  employee_reports: EmployeeReport[]; // Array of employee reports
};

export default function EmployeeReportTable() {
  const tableRef = useRef(null);
  const currentDate = new Date();

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [reportData, setReportData] = useState<ReportData | null>();

  useEffect(() => {
    async function fetchRecords() {
      try {
        const startDate = startOfMonth(new Date(selectedYear, selectedMonth - 1));
        const endDate = endOfMonth(new Date(selectedYear, selectedMonth - 1));
        const startDay = format(startDate, "dd");
        const endDay = format(endDate, "dd");
        const res = await apiCaller.get<ReportData>("/api/attendance_app/attendance-report/", {
          params: {
            from_date: `${selectedYear}-${selectedMonth}-${startDay}`,
            to_date: `${selectedYear}-${selectedMonth}-${endDay}`,
          },
        });
        setReportData(res.data);
      } catch (err) {}
    }
    fetchRecords();
  }, [selectedYear, selectedMonth]);

  if (!reportData) return null;

  const { from_date, to_date, employee_reports } = reportData;

  const dateRange = eachDayOfInterval({
    start: parseISO(from_date),
    end: parseISO(to_date),
  });

  const formattedDates = dateRange.map((date) => format(date, "yyyy-MM-dd"));

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4 self-end">
        <YearMonthSelector
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
        />

        <DownloadTableExcel
          filename="attendance-records"
          sheet="attendance"
          currentTableRef={tableRef.current}>
          <Button>Export excel</Button>
        </DownloadTableExcel>
      </div>

      <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-white">
        <Table ref={tableRef}>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Total Hours</TableHead>
              <TableHead>Days Attended</TableHead>
              {formattedDates.map((date) => (
                <TableHead key={date} className="whitespace-nowrap">
                  {format(date, "dd MMM")}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {employee_reports.map((employee) => (
              <TableRow key={employee.employee}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.total_hours}</TableCell>
                <TableCell>{employee.days_attended}</TableCell>
                {formattedDates.map((date) => {
                  const attendance = employee.attendance.find((att) => att.date === date);
                  return (
                    <TableCell key={date} className="whitespace-nowrap">
                      {attendance ? attendance.status : "Absent"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
