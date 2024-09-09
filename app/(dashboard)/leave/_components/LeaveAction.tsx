"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { api } from "@/api/api";
import { toast } from "@/hooks/use-toast";
import { buttonVariants } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LeaveRequest } from "@/types/dashboard";
import { z } from "zod";
import { formatISODate } from "@/lib/utils";
import { useRouter } from "next/navigation";

type LeaveRequestOptionProps = {
  leaveRequest?: LeaveRequest;
  employeeName?: string;
  leaveId?: string;
  isRejected?: boolean;
  isApproved?: boolean;
  bulkAction?: boolean;
  selectedLeaveIDs?: string[];
  setShowBulkAction?: (value: boolean) => void;
  clearSelectedLeaves?: () => void;
  hideDropDown?: boolean;
};

const FormSchema = z.object({
  reason: z
    .string()
    .min(10, {
      message: "Reason must be at least 10 characters.",
    })
    .max(160, {
      message: "Reason must not be longer than 30 characters.",
    }),
});

export default function LeaveRequestOption({
  leaveRequest,
  employeeName,
  leaveId,
  isRejected,
  isApproved,
  bulkAction = false,
  selectedLeaveIDs,
  setShowBulkAction,
  clearSelectedLeaves,
  hideDropDown = false,
}: LeaveRequestOptionProps) {
  const router = useRouter();
  const [showApprove, setShowApprove] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);

  const [showReject, setShowReject] = useState(false);
  const [isRejectLoading, setIsRejectedLoading] = useState(false);

  const [showPreview, setShowPreview] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onApproveLeave() {
    try {
      setIsApproveLoading(true);
      await api.post("/api/companies-app/leave/approve/", {
        status: "Approved",
        leave_ids: selectedLeaveIDs?.length ? selectedLeaveIDs : [leaveId],
      });
      toast({
        description: "Ths application has been approved",
      });
      router.refresh();

      // if (clearSelectedLeaves) {
      //   clearSelectedLeaves();
      // }
    } catch (err) {
      toast({
        description: "Something went wrong. Please try again later!",
        variant: "destructive",
      });
    } finally {
      setIsApproveLoading(false);
    }
  }

  async function onRejectLeaveSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      setIsRejectedLoading(true);
      await api.post("/api/companies-app/leave/approve/", {
        leave_ids: selectedLeaveIDs?.length ? selectedLeaveIDs : [leaveId],
        status: "Rejected",
        rejection_reason: formData.reason,
      });
      toast({
        description: "Ths application has been rejected",
      });
      router.refresh();

      // if (clearSelectedLeaves) {
      //   clearSelectedLeaves();
      // }
    } catch (err) {
      toast({
        description: "Something went wrong. Please try again later!",
        variant: "destructive",
      });
    } finally {
      setIsRejectedLoading(false);
      setShowReject(false);
      if (showPreview) {
        setShowPreview(false);
      }
      if (setShowBulkAction) {
        setShowBulkAction(false);
      }
    }
  }

  return (
    <>
      {!hideDropDown && (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
            <Icons.option size={18} />
            <span className="sr-only">Open</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex cursor-pointer items-center"
              onSelect={() => setShowPreview(true)}>
              Review
            </DropdownMenuItem>

            {!isApproved && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    setShowApprove(true);
                  }}>
                  Approve
                </DropdownMenuItem>
              </>
            )}

            {!isRejected && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                  onSelect={() => setShowReject(true)}>
                  Reject
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <AlertDialog open={showApprove} onOpenChange={setShowApprove}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to Approve this leave?</AlertDialogTitle>
            <AlertDialogDescription>
              You can later mark this leave as rejected
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (e) => {
                e.preventDefault();
                await onApproveLeave();
                setShowApprove(false);
              }}
              // className="bg-primary focus:ring-red-600">
              className={buttonVariants({ variant: "default" })}>
              {isApproveLoading && <Icons.loader className="mr-2" />}
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showReject} onOpenChange={setShowReject}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to Reject this leave?</AlertDialogTitle>
            <AlertDialogDescription>
              You can later mark this leave as approved
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onRejectLeaveSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell a little bit about why you are rejecting his/her leave"
                        className="w-full resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Add Reason for {employeeName}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive" type="submit">
                  {isRejectLoading && <Icons.loader className="mr-2" />}
                  Reject
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showPreview || bulkAction}
        onOpenChange={(value) => {
          if (setShowBulkAction) {
            setShowBulkAction(value);
          } else {
            setShowPreview(value);
          }
        }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              You are reviewing leave application of {employeeName}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              You can later mark this leave application as approved or rejected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Card className="border-none shadow-none">
            {leaveRequest && (
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <p className="font-medium">Name</p>
                  <p>{leaveRequest.employee.first_name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Department</p>
                  <p>{leaveRequest.employee.department}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Leave Type</p>
                  <p>{leaveRequest.leave_type}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Date Requested</p>
                  <p>{formatISODate(leaveRequest.start_date)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Duration</p>
                  <p>-</p>
                </div>
                <div className="flex flex-col justify-between space-y-1">
                  <p className="font-medium">Reason for Leave:</p>
                  <p>{leaveRequest.reason}</p>
                </div>
              </CardContent>
            )}
          </Card>
          <AlertDialogFooter className="flex">
            {!isApproved && (
              <Button
                onClick={async () => {
                  await onApproveLeave();
                  if (setShowBulkAction) {
                    setShowBulkAction(false);
                  }
                  setShowPreview(false);
                }}>
                {isApproveLoading && <Icons.loader className="mr-2" />}
                Approve Leave
              </Button>
            )}
            {!isRejected && (
              <Button
                variant="destructive"
                onClick={() => {
                  setShowReject(true);
                }}
                type="submit">
                {isRejectLoading && <Icons.loader className="mr-2" />}
                Reject Leave
              </Button>
            )}
            <AlertDialogAction className={buttonVariants({ variant: "secondary" })}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
