import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Payroll } from "@/types/types";

export const HistoryPayrollTable = ({ payrollData }: { payrollData: Payroll }) => {
  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Net Pay</TableHead>
            <TableHead>Paid Amount</TableHead>
            <TableHead>Pending</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{payrollData.pay_date}</TableCell>
            <TableCell>{payrollData.final_salary}</TableCell>
            <TableCell>{payrollData.in_hand_salary}</TableCell>
            <TableCell>
              {payrollData.gross_salary} - {payrollData.in_hand_salary}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
