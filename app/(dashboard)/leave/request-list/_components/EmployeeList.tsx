import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { employeeListCell, employeeListData } from "../constant";
import { Icons } from "@/components/Icons";

export default function EmployeeList() {
  return (
    <div>
      <Table>
        <TableCaption>
          A list of employees as per requested filter.
        </TableCaption>
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
          {employeeListData.map((col, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{col.name}</TableCell>
              <TableCell>{col.department}</TableCell>
              <TableCell>{col.leave}</TableCell>
              <TableCell>{col.dateRequested}</TableCell>
              <TableCell>{col.reasonOfLeave}</TableCell>
              <TableCell>{col.duration}</TableCell>
              <TableCell className="capitalize">{col.status}</TableCell>
              <TableCell>
                <Select defaultValue={col.status}>
                  <SelectTrigger
                    noChev
                    className="border-none p-0 bg-transparent h-auto w-auto"
                  >
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
