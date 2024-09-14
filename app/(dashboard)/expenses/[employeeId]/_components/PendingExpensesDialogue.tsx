"use client";
import React, { ElementRef, useRef, useState, useTransition } from "react";
import { DialogClose, DialogContent } from "@/components/ui/dialog";
import { ExpenseReportSummary } from "@/app/(dashboard)/expenses/[employeeId]/_components/ExpenseReportSummary";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { expense } from "@/types/types";
import { apiCaller } from "@/lib/auth";
import { useRouter } from "next/navigation";

export const PendingExpensesDialogue = ({
  eachExpensesEmployeeData,
}: {
  eachExpensesEmployeeData: expense;
}) => {
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const { refresh } = useRouter();

  const handleApproveClick = () => {
    startTransition(async () => {
      await apiCaller.post("/api/payroll_app/company-side-employee-approval/", {
        expense_id: eachExpensesEmployeeData.id,
        hr_approved: true,
        accounts_approved: true,
      });
      closeRef.current?.click();
      refresh();
    });
  };

  const handleDeclineClick = () => {
    startTransition(async () => {
      await apiCaller.post("/api/payroll_app/company-side-employee-approval/", {
        expense_id: eachExpensesEmployeeData.id,
        reject: true,
        rejection_reason: rejectionReason,
      });
      closeRef.current?.click();
      refresh();
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRejectionReason(event.target.value);
  };
  const closeRef = useRef<ElementRef<"button">>(null);

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
          className={"border border-green-500 bg-transparent text-green-500 hover:bg-transparent"}
          disabled={isPending}
          onClick={handleApproveClick}>
          Approve
        </Button>
        <Button
          className={"border border-red-500 bg-transparent text-red-500 hover:bg-transparent"}
          disabled={isPending}
          onClick={handleDeclineClick}>
          Decline
        </Button>
      </div>
      <DialogClose asChild>
        <Button className={"hidden"} type="button" ref={closeRef} variant="secondary">
          Close
        </Button>
      </DialogClose>
    </DialogContent>
  );
};
