"use client";

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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Icons.add className="size-4 mr-2" />
          Add new Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Meeting</DialogTitle>
          <DialogDescription>
            <ScheduleMeeting />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
