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
import { payrollTableHead } from "@/app/(dashboard)/payroll/constant";
import { YearFilter } from "@/components/YearFilter";

export const PayrollTable = ({ payrollData }: { payrollData: Payroll[] }): React.ReactNode => {
  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-x-4">
        <h2 className="text-lg font-semibold">Payroll History</h2>
        <YearFilter />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {payrollTableHead.map((value, index) => (
                <TableHead key={index}>{value}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollData.map((eachPayroll: Payroll) => {
              return (
                <TableRow key={eachPayroll.pay_date}>
                  <TableCell>
                    {new Date(eachPayroll.pay_date).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell className={"text-nowrap"}>
                    Rs {eachPayroll.bonus ? eachPayroll.bonus : 0}
                  </TableCell>
                  <TableCell className={"text-nowrap"}>Rs {eachPayroll.total_deductions}</TableCell>
                  <TableCell className={"text-nowrap"}>Rs {eachPayroll.in_hand_salary}</TableCell>
                  <TableCell className={"text-nowrap"}>Rs {eachPayroll.in_hand_salary}</TableCell>
                  <TableCell className={"text-nowrap"}>Rs {eachPayroll.arrears_amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
