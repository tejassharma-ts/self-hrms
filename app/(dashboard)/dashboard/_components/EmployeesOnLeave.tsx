import { getFullName } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaveRequest } from "@/types/dashboard";
import { getFullbackName } from "@/lib/utils";
import { formatISODate } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type EmployeesOnLeaveProps = {
  leavesRequest: LeaveRequest[];
};

export default async function EmployeesOnLeave({ leavesRequest }: EmployeesOnLeaveProps) {
  return (
    <div className="h-[300px] rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Employees On Leave</h2>
        <Link href="/leave" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          View more
        </Link>
      </div>
      <div className="overflow-x-auto">
        <div className="max-h-56">
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
              {leavesRequest.map((request) => (
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
                  <TableCell>{request.leave_duration}</TableCell>
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
