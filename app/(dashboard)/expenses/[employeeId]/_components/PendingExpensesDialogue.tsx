"use client";
import React, { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { ExpenseReportSummary } from "@/app/(dashboard)/expenses/[employeeId]/_components/ExpenseReportSummary";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { expense } from "@/types/types";
import { apiCaller } from "@/lib/auth";

export const PendingExpensesDialogue = ({
  eachExpensesEmployeeData,
}: {
  eachExpensesEmployeeData: expense;
}) => {
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const handleApproveClick = () => {
    apiCaller.post("/api/payroll_app/company-side-employee-approval/", {
      expense_id: eachExpensesEmployeeData.id,
      hr_approved: true,
      accounts_approved: true,
    });
  };

  const handleDeclineClick = () => {
    apiCaller.post("/api/payroll_app/company-side-employee-approval/", {
      expense_id: eachExpensesEmployeeData.id,
      reject: true,
      rejection_reason: rejectionReason,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRejectionReason(event.target.value);
  };

  return (
    <DialogContent className={"min-w-max px-10"}>
      <ExpenseReportSummary
        status={eachExpensesEmployeeData.status}
        eachExpensesEmployeeData={eachExpensesEmployeeData}
      />
      <Textarea
        placeholder={"Reason for declination"}
        value={rejectionReason}
        onChange={handleChange}
      />
      <div className={"flex justify-center gap-x-3"}>
        <Button
          className={"border border-green-500 bg-transparent text-green-500"}
          onClick={handleApproveClick}>
          Approve
        </Button>
        <Button
          className={"border border-red-500 bg-transparent text-red-500"}
          onClick={handleDeclineClick}>
          Decline
        </Button>
      </div>
    </DialogContent>
  );
};
