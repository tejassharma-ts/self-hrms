import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent } from "@/components/ui/dialog";

export const DeclinedExpensesDialogue = () => {
  return (
    <DialogContent>
      <div className={"flex flex-col items-center gap-y-6"}>
        <h2 className={"text-xl font-semibold text-slate-600"}>Reason for declination</h2>
        <Textarea />
      </div>
    </DialogContent>
  );
};
