import { delay, getFullName } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/api/api";
import { LeavesDataApi } from "@/types/dashboard";
import { getFullbackName } from "@/lib/utils";
import { formatISODate } from "@/lib/utils";

const employees = [
  {
    name: "Esthera Jackson",
    role: "Designer",
    duration: "4 days",
    leaveType: "Sick Leave",
    leaveEnd: "14/06/21",
    time: "Full Day",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Doe",
    role: "Developer",
    duration: "2 days",
    leaveType: "Vacation",
    leaveEnd: "12/06/21",
    time: "Half Day",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    role: "Project Manager",
    duration: "3 days",
    leaveType: "Personal Leave",
    leaveEnd: "16/06/21",
    time: "Full Day",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  // {
  //   name: "Michael Brown",
  //   role: "QA Engineer",
  //   duration: "1 day",
  //   leaveType: "Sick Leave",
  //   leaveEnd: "11/06/21",
  //   time: "Full Day",
  //   avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  // },
  // Add more employee data here if needed
];

async function getAllEmployeeLeave() {
  try {
    const res = await api.get<LeavesDataApi>("/api/companies-app/company/leaves/");
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export default async function EmployeesOnLeave() {
  const employeeAtLeave = await getAllEmployeeLeave();
  if (!employeeAtLeave) {
    return <h1>Opps can't fetch the data</h1>;
  }
  return (
    <div className="h-[300px] rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Employees On Leave</h2>
        <a href="#" className="text-sm text-black">
          View more
        </a>
      </div>
      <div className="overflow-x-auto">
        <div className="max-h-56 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Leave Start</TableHead>
                <TableHead>Leave End</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeAtLeave.leaves_request.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="py-2.5 font-medium">
                    <div className="flex items-center">
                      <Avatar className="mr-2">
                        <AvatarImage
                          src={request.employee.profile_picture}
                          alt={getFullName(request.employee.first_name, request.employee.last_name)}
                        />
                        <AvatarFallback>
                          {getFullbackName(request.employee.first_name, request.employee.last_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {getFullName(request.employee.first_name, request.employee.last_name)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {request.employee.department}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>{request.leave_type}</TableCell>
                  <TableCell className="text-right">{formatISODate(request.applied_at)}</TableCell>
                  <TableCell>{formatISODate(request.end_date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
