"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ScheduleMeeting from "./ScheduleMeeting";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

export default function AddNewEvent({
  className,
  defaultForm,
}: {
  className?: string;
  defaultForm?: string;
}) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <Icons.add className="mr-2 size-4" />
          Add new Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Add Event</DialogTitle>
          <DialogDescription>
            <ScheduleMeeting defaultForm={defaultForm} setShowDialog={setShowDialog} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
