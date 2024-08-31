import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { employeeListCellLeave, employeeLeaveData } from "../constant";

export default function EmployeeLeave() {
  return (
    <div>
      <Table>
        <TableCaption>A list of employees as per requested filter.</TableCaption>
        <TableHeader>
          <TableRow>
            {employeeListCellLeave.map((cell, idx) => (
              <TableHead key={idx} className="capitalize">
                {cell}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeeLeaveData.map((col, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{col.name}</TableCell>
              <TableCell>{col.department}</TableCell>
              <TableCell>{col.leave}</TableCell>
              <TableCell>{col.dateRequested}</TableCell>
              <TableCell>{col.reasonOfLeave}</TableCell>
              <TableCell>{col.duration}</TableCell>
              <TableCell className="capitalize">{col.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
