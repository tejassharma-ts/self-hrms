import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { attendanceTableHead } from "@/app/(dashboard)/my-team/constants";
import { EmployeeAttendance } from "@/types/types";

export const AttendanceTable = ({ attendance }: { attendance: EmployeeAttendance }) => {
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
              <TableCell className="text-nowrap">{attendance.employee}</TableCell>
              <TableCell className="text-nowrap">{attendance.company}</TableCell>
              <TableCell className="text-nowrap">{attendance.date}</TableCell>
              <TableCell className="text-nowrap">{attendance?.check_in_time || "N/A"}</TableCell>
              <TableCell className="text-nowrap">{attendance?.check_out_time || "N/A"}</TableCell>
              <TableCell className="text-nowrap">{attendance.status}</TableCell>
              <TableCell className="text-nowrap">{attendance.lat || "N/A"}</TableCell>
              <TableCell className="text-nowrap">{attendance.long || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
