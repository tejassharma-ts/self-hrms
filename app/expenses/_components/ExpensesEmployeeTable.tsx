import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { EmployeeData } from "@/app/expenses/_data/DummyExpensesEmployeeTableData";

export const ExpensesEmployeeTable = (): React.ReactNode => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">EmployeeID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total Expense</TableHead>
            <TableHead className="">Payable amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {EmployeeData.map((eachEmployee: EmployeeData) => (
            <TableRow key={eachEmployee.employeeId}>
              <TableCell>{eachEmployee.employeeId}</TableCell>
              <TableCell>{eachEmployee.name}</TableCell>
              <TableCell>{eachEmployee.department}</TableCell>
              <TableCell>{eachEmployee.date}</TableCell>
              <TableCell>{eachEmployee.totalExpense}</TableCell>
              <TableCell>{eachEmployee.payableAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
