import React from "react";
import { expense } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheck, CircleX, Clock7, EllipsisVertical } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ExpenseReportSummary } from "@/app/(dashboard)/expenses/[employeeId]/_components/ExpenseReportSummary";
import { PendingExpensesDialogue } from "@/app/(dashboard)/expenses/[employeeId]/_components/PendingExpensesDialogue";

export const HistoryExpensesTable = ({ expenses }: { expenses: expense[] }) => {
  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Expense Type</TableHead>
            <TableHead>status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={expenses[0].id}>
            <TableCell>{expenses[0].date_incurred}</TableCell>
            <TableCell>{expenses[0].category}</TableCell>
            <TableCell>
              <span className={"flex items-center gap-x-2"}>
                {expenses[0].status === "approved" ? (
                  <CircleCheck className={"text-green-500"} />
                ) : expenses[0].status === "pending" ? (
                  <Clock7 className={"text-yellow-500"} />
                ) : (
                  <CircleX className={"text-red-500"} />
                )}
                {expenses[0].status}
              </span>
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger>
                  <EllipsisVertical />
                </DialogTrigger>
                <DialogContent className={"min-w-max px-10"}>
                  {expenses[0].status === "approved" ? (
                    <ExpenseReportSummary
                      status={expenses[0].status}
                      eachExpensesEmployeeData={expenses[0]}
                    />
                  ) : expenses[0].status === "rejected" ? (
                    <ExpenseReportSummary
                      status={expenses[0].status}
                      eachExpensesEmployeeData={expenses[0]}
                    />
                  ) : (
                    <PendingExpensesDialogue eachExpensesEmployeeData={expenses[0]} />
                  )}
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};