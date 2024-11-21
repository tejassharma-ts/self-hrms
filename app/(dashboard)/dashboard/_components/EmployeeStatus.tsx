import { AttendanceDataApi } from "@/types/dashboard";
import ValueCard from "./ValueCard";
import { apiCaller } from "@/lib/auth";
import { cookies } from "next/headers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn, formatTime, getFullName } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function getEmployeeAttendence() {
  try {
    const res = await apiCaller.get<AttendanceDataApi>("/api/companies-app/company/attendance/", {
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
    });
    return res.data;
  } catch (err) {
    // console.log("What the hell", err);
  }
}

export default async function EmployeeStatus({ className }: { className: string }) {
  const employeeStatus = await getEmployeeAttendence();
  if (!employeeStatus) {
    return (
      <div className="col-span-4">
        <h1>Opps can't fetch</h1>
      </div>
    );
  }

  return (
    <>
      <div className={cn("group relative w-full", className)}>
        <ValueCard
          key={1}
          value={employeeStatus.present_count}
          title="Checked In"
          subtitle="Open/Closed"
          className={className}
        />
        <Dialog>
          <DialogTrigger
            asChild
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100">
            <Button variant="ghost" size="sm">
              Show all
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-3 text-xl">List of employees checked in today</DialogTitle>
              <DialogDescription>
                {employeeStatus.checked_in_employees.length ? (
                  <ScrollArea className="h-[350px]">
                    <div className="pr-4">
                      {employeeStatus.checked_in_employees.map((employee) => (
                        <div
                          key={employee.id}
                          className="mb-4 flex items-center justify-between last:mb-0">
                          <div className="flex space-x-2.5">
                            <Avatar>
                              <AvatarImage src={employee.profile_picture || ""} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col space-y-0.5">
                              <h3 className="font-semibold text-black">
                                {getFullName(employee.first_name, employee.last_name)}
                              </h3>
                              <p className="text-sm text-gray-500">{employee.position}</p>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <p className="grid grid-cols-2">
                              <span>Check in :</span>
                              <span className="font-medium text-black">
                                {formatTime(employee.check_in_time)}
                              </span>
                            </p>
                            <p className="grid grid-cols-2">
                              <span>Check out :</span>
                              <span className="font-medium text-black">
                                {formatTime(employee.check_out_time)}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <h1 className="mt-2 text-lg font-medium text-gray-500">No checked in employee</h1>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className={cn("group relative w-full", className)}>
        <ValueCard
          key={2}
          value={employeeStatus.absent_count}
          title="Absent"
          subtitle="Not checked In + On Leave"
        />
        <Dialog>
          <DialogTrigger
            asChild
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100">
            <Button variant="ghost" size="sm">
              Show all
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-3 text-xl">List of employees checked in today</DialogTitle>
              <DialogDescription>
                {employeeStatus.absent_employees.length ? (
                  <ScrollArea className="h-[350px]">
                    <div className="pr-4">
                      {employeeStatus.absent_employees.map((employee) => (
                        <div
                          key={employee.id}
                          className="mb-4 flex items-center justify-between last:mb-0">
                          <div className="flex space-x-2.5">
                            <Avatar>
                              <AvatarImage src={employee.profile_picture || ""} />
                              <AvatarFallback>RIP</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col space-y-0.5">
                              <h3 className="font-semibold text-black">
                                {getFullName(employee.first_name, employee.last_name)}
                              </h3>
                              <p className="text-sm text-gray-500">{employee.position}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <h1 className="mt-2 text-lg font-medium text-gray-500">No absent employee's</h1>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
