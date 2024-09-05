import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  profile_picture: string;
}

interface AttendanceData {
  present_employees: Employee[];
  not_yet_marked_employees: Employee[];
  absent_employees: Employee[];
  present_count: number;
  not_yet_marked_count: number;
  absent_count: number;
  total_employee: number;
  status: number;
}

interface AttendanceListProps {
  attendanceData: AttendanceData;
}

const AttendanceList: React.FC<AttendanceListProps> = ({ attendanceData }) => {
  const renderEmployeeRow = (employee: Employee, status: string) => (
    <TableRow key={employee.id}>
      <TableCell>{employee.id}</TableCell>
      <TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
      <TableCell>{employee.position}</TableCell>
      <TableCell>{employee.email}</TableCell>
      <TableCell>{status}</TableCell>
    </TableRow>
  );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Attendance List</h1>
      <p>Date: {new Date().toLocaleDateString()}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{attendanceData.total_employee}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Present</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{attendanceData.present_count}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{attendanceData.absent_count}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Not Yet Marked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{attendanceData.not_yet_marked_count}</p>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceData.present_employees.map(employee => renderEmployeeRow(employee, 'Present'))}
          {attendanceData.absent_employees.map(employee => renderEmployeeRow(employee, 'Absent'))}
          {attendanceData.not_yet_marked_employees.map(employee => renderEmployeeRow(employee, 'Not Yet Marked'))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceList;