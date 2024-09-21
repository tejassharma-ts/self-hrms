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

export default function AddNewEvent() {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild className="absolute -bottom-8 left-1/2 -translate-x-1/2">
        <Button variant="outline">
          <Icons.add className="mr-2 size-4" />
          Add new Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Meeting</DialogTitle>
          <DialogDescription>
            <ScheduleMeeting setShowDialog={setShowDialog} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
