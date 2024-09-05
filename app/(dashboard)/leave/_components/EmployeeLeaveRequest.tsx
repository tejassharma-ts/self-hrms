import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { employeeListCell } from "../constant";
import { Icons } from "@/components/Icons";
import { LeaveRequest } from "@/types/dashboard";
import { getFullName } from "@/lib/utils";

type EmployeeLeaveRequestProps = {
  leaveRequest: LeaveRequest[];
};
export default function EmployeeLeaveRequest({ leaveRequest }: EmployeeLeaveRequestProps) {
  if (!leaveRequest) {
    return <h1>Opps</h1>;
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of employees as per requested filter.</TableCaption>
        <TableHeader>
          <TableRow>
            {employeeListCell.map((cell, idx) => (
              <TableHead key={idx} className="capitalize">
                {cell}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveRequest.map((col, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">
                {getFullName(col.employee.first_name, col.employee.last_name)}
              </TableCell>
              <TableCell>{col.employee.department}</TableCell>
              <TableCell>{col.leave_type}</TableCell>
              <TableCell>{col.start_date}</TableCell>
              <TableCell>{col.reason}</TableCell>
              <TableCell>_</TableCell>
              <TableCell className="capitalize">{col.status}</TableCell>
              <TableCell>
                <Select defaultValue={col.status}>
                  <SelectTrigger noChev className="h-auto w-auto border-none bg-transparent p-0">
                    <Icons.option className="size-4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="denied">Denied</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
