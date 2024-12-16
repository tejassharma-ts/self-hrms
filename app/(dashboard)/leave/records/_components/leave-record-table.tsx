"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { apiCaller } from "@/lib/auth";
import { YearMonthSelector } from "@/app/(dashboard)/dashboard/_components/YearMonthSelector";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Button } from "@/components/ui/button";

type Leave = {
  leave_type: string; // Type of leave, e.g., "Casual", "Sick", etc.
  start_date: string; // Start date of the leave, e.g., "2024-11-20"
  end_date: string; // End date of the leave, e.g., "2024-11-30"
  reason: string; // Reason for the leave, empty string if not provided
  status: string; // Leave status, e.g., "Approved", "Rejected"
  reviewed_at: string; // ISO timestamp when the leave was reviewed
  short_leave_hours: number | null; // Nullable number for short leave hours
  from_time: string | null; // Nullable string for the leave's start time
  to_time: string | null; // Nullable string for the leave's end time
  leave_duration: number; // Duration of the leave in days
};

type EmployeeLeaveReport = {
  name: string;
  department: string;
  position: string;
  total_leaves: number; // Total leaves taken by the employee
  leaves: Leave[]; // Array of individual leave records
};

type LeaveReportData = {
  from_date: string; // Start of the report period in ISO format, e.g., "2024-11-01"
  to_date: string; // End of the report period in ISO format, e.g., "2024-11-30"
  leave_reports: EmployeeLeaveReport[]; // Array of employee leave reports
};

export default function LeaveRecordTable() {
  const tableRef = useRef(null);
  const currentDate = new Date();

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [reportData, setReportData] = useState<LeaveReportData | null>();

  useEffect(() => {
    async function fetchRecords() {
      try {
        const startDate = startOfMonth(new Date(selectedYear, selectedMonth - 1));
        const endDate = endOfMonth(new Date(selectedYear, selectedMonth - 1));
        const startDay = format(startDate, "dd");
        const endDay = format(endDate, "dd");
        const res = await apiCaller.get<LeaveReportData>("/api/attendance_app/leave-report/", {
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
          filename="leave-records"
          sheet="leaves"
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
              <TableHead>Leave Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Duration (Days)</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reviewed At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportData.leave_reports.map((report) =>
              report.leaves.map((leave, index) => (
                <TableRow key={`${report.name}-${index}`}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.department}</TableCell>
                  <TableCell>{report.position}</TableCell>
                  <TableCell>{leave.leave_type}</TableCell>
                  <TableCell>{leave.start_date}</TableCell>
                  <TableCell>{leave.end_date}</TableCell>
                  <TableCell>{leave.leave_duration}</TableCell>
                  <TableCell>{leave.reason || "-"}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                  <TableCell>{new Date(leave.reviewed_at).toLocaleDateString()}</TableCell>
                </TableRow>
              )),
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
