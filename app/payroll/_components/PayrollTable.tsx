import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import {
  IPayrollTableDummyData,
  PayrollTableDummyData,
} from "@/app/payroll/_data/PayrollTableDummyData";
import { PayrollYearFilter } from "@/app/payroll/_components/PayrollYearFilter";

export const PayrollTable = (): React.ReactNode => {
  return (
    <>
      <div className={"mb-3 flex items-center justify-between gap-x-4"}>
        <h2 className={"text-lg font-semibold"}>Payroll History</h2>
        <PayrollYearFilter />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Bonus</TableHead>
              <TableHead>Deductions</TableHead>
              <TableHead>Payable</TableHead>
              <TableHead>Paid Amount</TableHead>
              <TableHead>Pending</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PayrollTableDummyData.map((eachPayroll: IPayrollTableDummyData) => (
              <TableRow key={eachPayroll.month}>
                <TableCell className="font-medium">{eachPayroll.month}</TableCell>
                <TableCell className="font-medium">Rs {eachPayroll.bonus}</TableCell>
                <TableCell>Rs {eachPayroll.deduction}</TableCell>
                <TableCell>Rs {eachPayroll.payable}</TableCell>
                <TableCell>Rs {eachPayroll.paidAmount}</TableCell>
                <TableCell>Rs {eachPayroll.pending}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
