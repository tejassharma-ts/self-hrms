import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BulkAddReasonDec from "./BulkAddReasonDec";
import BulkapproveAll from "./BulkApproveAll";

type BulkManageRequestProps = {
  className?: string;
  selectedLeaves: string[];
};

export default function BulkManageRequest({ className, selectedLeaves }: BulkManageRequestProps) {
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [isBulkApproveOpen, setIsBulkApproveOpen] = useState(false);
  const [isBulkAddReasonOpen, setIsBulkAddReasonOpen] = useState(false);

  const openBulkApprove = () => {
    setIsBulkApproveOpen(true);
  };

  const openBulkAddReason = () => {
    setIsBulkAddReasonOpen(true);
  };

  const closeAllModals = () => {
    setIsParentModalOpen(false);
    setIsBulkApproveOpen(false);
    setIsBulkAddReasonOpen(false);
  };

  return (
    <Dialog open={isParentModalOpen} onOpenChange={setIsParentModalOpen}>
      <DialogTrigger asChild className={className}>
        <Button>Bulk Action</Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-2xl">Manage Requests</DialogTitle>
          <DialogDescription>
            <p className="text-md mt-5 font-semibold text-black">Number of Employees Selected: 5</p>
          </DialogDescription>
        </DialogHeader>
        <div className="mb-4 flex items-center justify-around">
          <Button onClick={openBulkApprove}>Open Bulk Approve All</Button>
          <Button onClick={openBulkAddReason}>Open Bulk Add Reason</Button>
        </div>

        {isBulkApproveOpen && (
          <BulkapproveAll isOpen={isBulkApproveOpen} onClose={closeAllModals} />
        )}
        {isBulkAddReasonOpen && (
          <BulkAddReasonDec isOpen={isBulkAddReasonOpen} onClose={closeAllModals} />
        )}
      </DialogContent>
    </Dialog>
  );
}
