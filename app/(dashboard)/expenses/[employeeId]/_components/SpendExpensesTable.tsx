import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { CircleCheck, CircleX, Clock7, EllipsisVertical } from "lucide-react";
import { Expenses } from "@/app/(dashboard)/expenses/page";

export const SpendExpensesTable = ({
  spendExpensesData,
}: {
  spendExpensesData: Expenses[];
}): React.ReactNode => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Expense Type</TableHead>
            <TableHead>status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spendExpensesData.map((eachExpensesEmployeeData: Expenses) => (
            <TableRow key={eachExpensesEmployeeData.employee.id}>
              <TableCell>{eachExpensesEmployeeData.date_incurred}</TableCell>
              <TableCell>{eachExpensesEmployeeData.category}</TableCell>
              <TableCell>
                <span className={"flex items-center gap-x-2"}>
                  {eachExpensesEmployeeData.status === "approved" ? (
                    <CircleCheck className={"text-green-500"} />
                  ) : eachExpensesEmployeeData.status === "pending" ? (
                    <Clock7 className={"text-yellow-500"} />
                  ) : (
                    <CircleX className={"text-red-500"} />
                  )}
                  {eachExpensesEmployeeData.status}
                </span>
              </TableCell>
              <TableCell>
                <EllipsisVertical />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};