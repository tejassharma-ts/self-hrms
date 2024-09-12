import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Payroll } from "@/app/(dashboard)/payroll/history/page";

const tableHeadValues = [
  "Name",
  "ID",
  "HRA",
  "Allowance",
  "Bonus",
  "Special Allowance",
  "ESIC",
  "EPF",
  "LTA",
  "CTC",
  "Net Pay",
];

export const PayrollOverviewTable = ({
  payrollData,
}: {
  payrollData: Payroll[];
}): React.ReactNode => {
  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className={"bg-black text-white hover:bg-black"}>
              {tableHeadValues.map((value, index) => (
                <TableHead key={index} className={"text-white"}>
                  {value}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollData.map((eachPayroll: Payroll) => {
              return (
                <TableRow key={eachPayroll.id}>
                  <TableCell>
                    {eachPayroll.employee.first_name} {eachPayroll.employee.last_name}
                  </TableCell>
                  <TableCell>{eachPayroll.total_deductions}</TableCell>
                  <TableCell>Rs </TableCell>
                  <TableCell>Rs {eachPayroll.total_deductions}</TableCell>
                  <TableCell>Rs {eachPayroll.bonus ? eachPayroll.bonus : 0}</TableCell>
                  <TableCell>Rs {eachPayroll.total_deductions}</TableCell>
                  <TableCell>Rs {eachPayroll.esi_contribution}</TableCell>
                  <TableCell>Rs {eachPayroll.pf_contribution}</TableCell>
                  <TableCell>Rs {eachPayroll.arrears_amount}</TableCell>
                  <TableCell>Rs {eachPayroll.arrears_amount}</TableCell>
                  <TableCell>Rs {eachPayroll.final_salary}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
