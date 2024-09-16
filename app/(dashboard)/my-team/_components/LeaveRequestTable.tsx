import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaveRequest } from "@/types/types";
import { leaveRequestTableHead } from "@/app/(dashboard)/my-team/constants";

export const LeaveRequestTable = ({ leaveRequestTableData }: { leaveRequestTableData: any }) => {
  return (
    <div className="w-full rounded-md border">
      <Table className={"w-full overflow-scroll"}>
        <TableHeader>
          <TableRow>
            {leaveRequestTableHead.map((value, index) => (
              <TableHead key={index}>{value}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveRequestTableData.map((eachLeaveRequest: LeaveRequest) => (
            <TableRow key={eachLeaveRequest.id}>
              <TableCell className={"text-nowrap"}>{eachLeaveRequest.leave_type}</TableCell>
              <TableCell className={"text-nowrap"}>{eachLeaveRequest.start_date}</TableCell>
              <TableCell className={"text-nowrap"}>{eachLeaveRequest.reason}</TableCell>
              <TableCell className={"text-nowrap"}>{eachLeaveRequest.start_date}</TableCell>
              <TableCell className={"text-nowrap"}>{eachLeaveRequest.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
