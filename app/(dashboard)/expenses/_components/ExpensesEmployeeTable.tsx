import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import Link from "next/link";
import { Expenses } from "@/types/types";

const tableHeadValues: string[] = [
  "EmployeeId",
  "Name",
  "Department",
  "Date",
  "Total Expense",
  "Payable Amount",
];

export const ExpensesEmployeeTable = ({
  expensesEmployeeData,
}: {
  expensesEmployeeData: Expenses;
}): React.ReactNode => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeadValues.map((value, index) => (
              <TableHead key={index}>{value}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {expensesEmployeeData.expenses.map((eachExpensesEmployeeData) => (
            <TableRow key={eachExpensesEmployeeData.id}>
              <TableCell className={"text-nowrap"}>
                <Link href={`/expenses/${eachExpensesEmployeeData.employee.id}`}>
                  {eachExpensesEmployeeData.employee.id}
                </Link>
              </TableCell>
              <TableCell>{eachExpensesEmployeeData.employee.first_name}</TableCell>
              <TableCell>{eachExpensesEmployeeData.employee.department}</TableCell>
              <TableCell className={"text-nowrap"}>
                {eachExpensesEmployeeData.date_incurred}
              </TableCell>
              <TableCell>{eachExpensesEmployeeData.amount}</TableCell>
              <TableCell>{eachExpensesEmployeeData.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
