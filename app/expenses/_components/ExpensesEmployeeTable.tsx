import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface EmployeeData {
  employeeId: string;
  name: string;
  department: string;
  date: string;
  totalExpense: number;
  payableAmount: number;
}

const EmployeeData: EmployeeData[] = [
  {
    employeeId: "INV001",
    name: "akshat",
    department: "Design",
    date: "27 Aug 2024",
    totalExpense: 25000,
    payableAmount: 25000,
  },
  {
    employeeId: "INV002",
    name: "Priya",
    department: "Marketing",
    date: "15 Aug 2024",
    totalExpense: 18000,
    payableAmount: 18000,
  },
  {
    employeeId: "INV003",
    name: "Ravi",
    department: "Development",
    date: "12 Sep 2024",
    totalExpense: 32000,
    payableAmount: 31000,
  },
  {
    employeeId: "INV004",
    name: "Sneha",
    department: "HR",
    date: "20 Jul 2024",
    totalExpense: 15000,
    payableAmount: 14000,
  },
  {
    employeeId: "INV005",
    name: "Amit",
    department: "Finance",
    date: "01 Sep 2024",
    totalExpense: 22000,
    payableAmount: 22000,
  },
  {
    employeeId: "INV006",
    name: "Manish",
    department: "Operations",
    date: "17 Aug 2024",
    totalExpense: 28000,
    payableAmount: 27000,
  },
  {
    employeeId: "INV007",
    name: "Simran",
    department: "Sales",
    date: "25 Jun 2024",
    totalExpense: 19000,
    payableAmount: 19000,
  },
  {
    employeeId: "INV008",
    name: "Rahul",
    department: "Design",
    date: "05 Sep 2024",
    totalExpense: 24000,
    payableAmount: 23000,
  },
  {
    employeeId: "INV009",
    name: "Anita",
    department: "Development",
    date: "30 Aug 2024",
    totalExpense: 35000,
    payableAmount: 34000,
  },
  {
    employeeId: "INV010",
    name: "Karan",
    department: "HR",
    date: "10 Jul 2024",
    totalExpense: 21000,
    payableAmount: 20000,
  },
  {
    employeeId: "INV011",
    name: "Nidhi",
    department: "Finance",
    date: "18 Aug 2024",
    totalExpense: 26000,
    payableAmount: 25000,
  },
];

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
          {EmployeeData.map((eachEmployee) => (
            <TableRow key={eachEmployee.employeeId}>
              <TableCell className="font-medium">{eachEmployee.employeeId}</TableCell>
              <TableCell>{eachEmployee.name}</TableCell>
              <TableCell>{eachEmployee.department}</TableCell>
              <TableCell>{eachEmployee.date}</TableCell>
              <TableCell>{eachEmployee.totalExpense}</TableCell>
              <TableCell className="">{eachEmployee.payableAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
