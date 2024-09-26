import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Employee } from "@/types/types";

interface Attendance {
  date: string;
  check_in_time: string | null;
  check_out_time: string | null;
  status: string;
}

interface AttendanceDashboardProps {
  employee: any;
  attendances: Attendance[];
  selectedMonth: any;
  setSelectedMonth: any;
  selectedYear: any;
  setSelectedYear: any;
  selectedStatus: any;
  setSelectedStatus: any;
}

const AttendanceDashboard: React.FC<AttendanceDashboardProps> = ({
  employee,
  attendances,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="flex-1 rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
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
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[130px] rounded-full bg-black text-white">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">January</SelectItem>
              <SelectItem value="2">February</SelectItem>
              <SelectItem value="3">March</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">June</SelectItem>
              <SelectItem value="7">July</SelectItem>
              <SelectItem value="8">August</SelectItem>
              <SelectItem value="9">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[100px] rounded-full bg-black text-white">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2020">2020</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[100px] rounded-full bg-black text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Present">Present</SelectItem>
              <SelectItem value="Absent">Absent</SelectItem>
              <SelectItem value="On leave">On Leave</SelectItem>
              <SelectItem value="Unpaid leave">Unpaid Leave</SelectItem>
              <SelectItem value="Not marked">Not Yet Marked</SelectItem>
              <SelectItem value="Half day">Half Day</SelectItem>
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
              <TableCell>{row.check_in_time || "-"}</TableCell>
              <TableCell>{row.check_out_time || "-"}</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    row.status === "Present"
                      ? "bg-green-100 text-green-800"
                      : row.status === "Half Day"
                        ? "bg-yellow-100 text-yellow-800"
                        : row.status === "On Leave"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
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
