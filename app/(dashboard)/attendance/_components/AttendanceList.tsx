"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Attendance } from "@/types/types";
import { formatTime } from "@/lib/utils";

type AttendanceListProps = {
  attendances: any;
};

export default function AttendanceList({ attendances }: AttendanceListProps) {
  if (!attendances) {
    return <h1>Opps</h1>;
  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">Attendance List</h1>
      <p className="mb-4 text-sm text-gray-500">Date- {new Date().toLocaleDateString()}</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-400">Employee ID</TableHead>
            <TableHead className="text-gray-400">Name</TableHead>
            <TableHead className="text-gray-400">Department</TableHead>
            <TableHead className="text-gray-400">Log In Time</TableHead>
            <TableHead className="text-gray-400">Log Out Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendances.employees.map((employee: any) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id.replaceAll("-", " ")}</TableCell>
              <TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
              <TableCell>{employee.department}</TableCell>
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
    </div>
  );
}
