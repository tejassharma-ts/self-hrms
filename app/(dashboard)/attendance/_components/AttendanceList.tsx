import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const attendanceData = [
  { id: "362367282354", name: "Floyd Miles", department: "Design", loginTime: "10:30 am", logoutTime: "6:00 am" },
  { id: "362367282354", name: "Floyd Miles", department: "Design", loginTime: "10:30 am", logoutTime: "6:00 am" },
  { id: "362367282354", name: "Floyd Miles", department: "Design", loginTime: "10:30 am", logoutTime: "6:00 am" },
  { id: "362367282354", name: "Floyd Miles", department: "Design", loginTime: "10:30 am", logoutTime: "6:00 am" },
  { id: "362367282354", name: "Floyd Miles", department: "Design", loginTime: "10:30 am", logoutTime: "6:00 am" },
  { id: "362367282354", name: "Floyd Miles", department: "Design", loginTime: "10:30 am", logoutTime: "6:00 am" },
];

const AttendanceList = () => {
  return (
    <div className="p-4 rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Attendance List</h1>
      <p className="mb-4">Date: 23 August 2024</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee I'd</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Login In Time</TableHead>
            <TableHead>Log Out Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceData.map((employee, index) => (
            <TableRow key={index}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell className="text-green-500">{employee.loginTime}</TableCell>
              <TableCell className="text-red-500">{employee.logoutTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceList;