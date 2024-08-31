import { delay } from "@/lib/utils";
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

export default async function EmployeesOnLeave() {
  // await delay(5000);
  //  fetch the employment detail
  return (
    <div className="p-6 h-[300px] bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
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
                <TableHead>Leave End</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium py-2.5">
                    <div className="flex items-center">
                      <Avatar className="mr-2">
                        <AvatarImage
                          src={employee.avatar}
                          alt={`${employee.name} Avatar`}
                        />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {employee.role}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.duration}</TableCell>
                  <TableCell>{employee.leaveType}</TableCell>
                  <TableCell>{employee.leaveEnd}</TableCell>
                  <TableCell className="text-right">{employee.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
