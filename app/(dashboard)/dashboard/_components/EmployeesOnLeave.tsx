import { formatTime, getFullName } from "@/lib/utils";
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
import { LeavesDataApi } from "@/types/dashboard";
import { getFullbackName } from "@/lib/utils";
import { formatISODate } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { apiCaller } from "@/lib/auth";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { format, parseISO } from "date-fns";

async function getAllEmployeeLeave() {
  try {
    const res = await apiCaller.get<LeavesDataApi>("/api/companies-app/company/leaves/", {
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export default async function EmployeesOnLeave({ className }: { className: string }) {
  const res = await getAllEmployeeLeave();

  if (!res) {
    return <h1>Opps</h1>;
  }

  return (
    <Card className={cn("flex flex-col rounded-2xl", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">Employees On Leave</h2>
        <Link
          href="/leave"
          className={buttonVariants({ variant: "outline", size: "sm", className: "px-8" })}>
          View all
        </Link>
      </CardHeader>
      <CardContent className="relative flex-1 pt-0">
        {res.leaves_request_count ? (
          <ScrollArea className="h-full pb-4">
            <Table>
              <TableHeader className="bg-white">
                <TableRow className="[&_th]:text-black">
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Leave Start</TableHead>
                  <TableHead>Leave End</TableHead>
                  <TableHead>From Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead className="text-center">Applied at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {res.leaves_request.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="whitespace-nowrap">
                      {request.employee.id.replaceAll("-", " ")}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {getFullName(request.employee.first_name, request.employee.last_name)}
                    </TableCell>
                    <TableCell className="capitalize">{request.employee.department}</TableCell>
                    <TableCell>{request.leave_type}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatISODate(request.start_date)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatISODate(request.end_date)}
                    </TableCell>
                    <TableCell>
                      {request.from_time ? format(parseISO(request.from_time), "HH:mm a") : "-"}
                    </TableCell>
                    <TableCell>
                      {request.to_time ? format(parseISO(request.to_time), "HH:mm a") : "-"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-left">
                      {formatISODate(request.applied_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-base font-medium text-gray-500">
              No one is on leave right now—let's keep the momentum going!
            </h1>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
