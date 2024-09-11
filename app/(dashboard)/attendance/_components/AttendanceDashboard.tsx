import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Attendance {
  date: string;
  check_in_time: string | null;
  check_out_time: string | null;
  status: string;
}

interface AttendanceDashboardProps {
  employee: EmployeeProfile;
  attendances: Attendance[];
}

const AttendanceDashboard: React.FC<AttendanceDashboardProps> = ({ employee, attendances }) => {
  return (
    <div className="p-4 rounded-lg flex-1 shadow-sm bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={employee.profile_picture} alt={`${employee.name}`} />
            <AvatarFallback>{`${employee.name[0]}`}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{`${employee.name}`}</h2>
            <p className="text-gray-500">Design</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className="w-[100px] rounded-full bg-black text-white">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="01">January</SelectItem>
              <SelectItem value="02">February</SelectItem>
              {/* Add more months */}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[100px] rounded-full bg-black text-white">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              {/* Add more years */}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[100px] rounded-full bg-black text-white">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="half-day">Half Day</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Login Time</TableHead>
            <TableHead>Log Out Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendances.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.check_in_time || '-'}</TableCell>
              <TableCell>{row.check_out_time || '-'}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  row.status === 'Present' ? 'bg-green-100 text-green-800' :
                  row.status === 'Half Day' ? 'bg-yellow-100 text-yellow-800' :
                  row.status === 'On Leave' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceDashboard;
