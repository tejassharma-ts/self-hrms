import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SendIconSvg } from "@/app/(dashboard)/payroll/_components/SendIconSvg";
import { tableHeadValues } from "@/app/(dashboard)/payroll/constant";
import { Payroll } from "@/types/types";

export const PayrollOverviewTable = ({
  payrollData,
}: {
  payrollData: Payroll[];
}): React.ReactNode => {
  return (
    <div className="w-full rounded-md border">
      <Table className="w-full overflow-x-scroll">
        <TableHeader>
          <TableRow className="bg-black text-white hover:bg-black">
            {tableHeadValues.map((value, index) => (
              <TableHead key={index} className="whitespace-nowrap px-4 py-2 text-white">
                {value}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrollData.map((eachPayroll: Payroll) => (
            <TableRow key={eachPayroll.id}>
              <TableCell className="whitespace-nowrap px-4 py-2">
                {eachPayroll.employee.first_name} {eachPayroll.employee.last_name}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">{eachPayroll.id}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">Rs {eachPayroll.hra}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                Rs {eachPayroll.allowances}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                Rs {eachPayroll.bonus ? eachPayroll.bonus : "0.00"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                Rs {eachPayroll.special_allowance}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                Rs {eachPayroll.esi_contribution}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                Rs {eachPayroll.expense_reimbursement ? eachPayroll.expense_reimbursement : "0.00"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                Rs {eachPayroll.arrears_amount}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                Rs {eachPayroll.gross_salary}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                Rs {eachPayroll.in_hand_salary}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                <p
                  className={
                    "flex w-full cursor-pointer items-center gap-x-1 rounded-full border border-gray-300 bg-transparent px-2 py-1"
                  }>
                  <span>Send </span>
                  <SendIconSvg />
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
