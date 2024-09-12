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
            <TableHead>EmployeeID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total Expense</TableHead>
            <TableHead>Payable amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expensesEmployeeData.expenses.map((eachExpensesEmployeeData) => (
            <TableRow key={eachExpensesEmployeeData.id}>
              <TableCell>
                <Link href={`/expenses/${eachExpensesEmployeeData.employee.id}`}>
                  {eachExpensesEmployeeData.employee.id}
                </Link>
              </TableCell>
              <TableCell>{eachExpensesEmployeeData.employee.first_name}</TableCell>
              <TableCell>{eachExpensesEmployeeData.employee.department}</TableCell>
              <TableCell>{eachExpensesEmployeeData.date_incurred}</TableCell>
              <TableCell>{eachExpensesEmployeeData.amount}</TableCell>
              <TableCell>{eachExpensesEmployeeData.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
