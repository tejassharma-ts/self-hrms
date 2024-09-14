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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PendingExpensesDialogue } from "@/app/(dashboard)/expenses/[employeeId]/_components/PendingExpensesDialogue";
import { ExpenseReportSummary } from "@/app/(dashboard)/expenses/[employeeId]/_components/ExpenseReportSummary";
import { expense } from "@/types/types";
import { Expense } from "@/app/(dashboard)/expenses/[employeeId]/page";

export const SpendExpensesTable = ({
  spendExpensesData,
}: {
  spendExpensesData: Expense[];
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
          {spendExpensesData.map((eachExpensesEmployeeData: expense) => (
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
                <Dialog>
                  <DialogTrigger>
                    <EllipsisVertical />
                  </DialogTrigger>
                  <DialogContent className={"min-w-max px-10"}>
                    {eachExpensesEmployeeData.status === "approved" ? (
                      <ExpenseReportSummary
                        status={eachExpensesEmployeeData.status}
                        eachExpensesEmployeeData={eachExpensesEmployeeData}
                      />
                    ) : eachExpensesEmployeeData.status === "rejected" ? (
                      <ExpenseReportSummary
                        status={eachExpensesEmployeeData.status}
                        eachExpensesEmployeeData={eachExpensesEmployeeData}
                      />
                    ) : (
                      <PendingExpensesDialogue
                        eachExpensesEmployeeData={eachExpensesEmployeeData}
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
