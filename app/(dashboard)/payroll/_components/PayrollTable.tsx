import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PayrollYearFilter } from "../_components/PayrollYearFilter";
import { Payroll } from "../page";

export const PayrollTable = ({ payrollData }: { payrollData: Payroll[] }): React.ReactNode => {
  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-x-4">
        <h2 className="text-lg font-semibold">Payroll History</h2>
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
            {payrollData.map((eachPayroll: Payroll) => {
              return (
                <TableRow key={eachPayroll.pay_date}>
                  <TableCell>{new Date(eachPayroll.pay_date).toLocaleDateString()}</TableCell>
                  <TableCell>Rs {eachPayroll.bonus ? eachPayroll.bonus : 0}</TableCell>
                  <TableCell>Rs {eachPayroll.total_deductions}</TableCell>
                  <TableCell>Rs {eachPayroll.in_hand_salary}</TableCell>
                  <TableCell>Rs {eachPayroll.in_hand_salary}</TableCell>
                  <TableCell>Rs {eachPayroll.arrears_amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
