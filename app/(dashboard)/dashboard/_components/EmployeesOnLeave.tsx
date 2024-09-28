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
          <TableBody>
            {leavesRequest.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.employee?.id || "N/A"}</TableCell>
                <TableCell className="py-2.5 font-medium">
                  <div className="flex items-center">
                    <Avatar className="mr-2">
                      <AvatarImage
                        src={request.employee?.profile_picture || "/path/to/dummy-image.jpg"}
                        alt={
                          request.employee
                            ? getFullName(request.employee.first_name, request.employee.last_name)
                            : "Unknown Employee"
                        }
                      />
                      <AvatarFallback>
                        {request.employee
                          ? getFullbackName(request.employee.first_name, request.employee.last_name)
                          : "Unknown"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {request.employee
                          ? getFullName(request.employee.first_name, request.employee.last_name)
                          : "Unknown Employee"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {request.employee?.department || "Unknown Department"}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{request.employee?.department || "Unknown Department"}</TableCell>
                <TableCell>{request.leave_type || "N/A"}</TableCell>
                <TableCell>{request.start_date || "N/A"}</TableCell>
                <TableCell>{request.end_date || "N/A"}</TableCell>
                <TableCell>{request?.from_time || "-"}</TableCell>
                <TableCell>{request?.end_time || "-"}</TableCell>
                <TableCell className="text-right">
                  {formatISODate(request.applied_at) || "N/A"}
                </TableCell>
                <TableCell>{formatISODate(request.end_date) || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </div>
      </div>
    </div>
  );
}
