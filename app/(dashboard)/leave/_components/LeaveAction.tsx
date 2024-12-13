"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

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
import { cn, formatISODate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { apiCaller } from "@/lib/auth";
import { isAppPageRouteDefinition } from "next/dist/server/future/route-definitions/app-page-route-definition";
import { Label } from "@/components/ui/label";
import { MemberAvatar } from "@/components/member-tooltip";
import AppError from "@/lib/error";

type LeaveRequestOptionProps = {
  leaveRequest?: LeaveRequest;
  employeeName?: string;
  leaveId?: string;
  isRejected?: boolean;
  isApproved?: boolean;
  bulkAction?: boolean;
  selectedLeaveIDs?: string[];
  selectedLeaves?: LeaveRequest[];
  setShowBulkAction?: (value: boolean) => void;
  clearSelectedLeaves?: () => void;
  hideDropDown?: boolean;
  handleSelectLeave?: (leaveReq: LeaveRequest) => void;
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
  selectedLeaves,
  setShowBulkAction,
  clearSelectedLeaves,
  hideDropDown = false,
  handleSelectLeave,
}: LeaveRequestOptionProps) {
  const router = useRouter();
  const [showApprove, setShowApprove] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);

  const [showReject, setShowReject] = useState(false);
  const [isRejectLoading, setIsRejectedLoading] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const [showBulkDecline, setShowBulkDecline] = useState(false);

  // for bulk decline
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);

  useEffect(() => {
    if (selectedLeaves?.length) {
      setSelectedLeave(selectedLeaves[0]);
    } else {
      if (showBulkDecline) {
        setShowBulkDecline(false);
        setSelectedLeave(null);
      }
      if (setShowBulkAction) {
        setShowBulkAction(false);
      }
    }
  }, [selectedLeaves]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onApproveLeave() {
    try {
      setIsApproveLoading(true);
      await apiCaller.post("/api/companies-app/leave/approve/", {
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
      const customError = new AppError(err);
      toast({
        description: customError.message,
        variant: "destructive",
      });
    } finally {
      setIsApproveLoading(false);
    }
  }

  async function onRejectLeaveSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      setIsRejectedLoading(true);
      await apiCaller.post("/api/companies-app/leave/approve/", {
        leave_ids: selectedLeaveIDs?.length ? selectedLeaveIDs : [leaveId],
        status: "Rejected",
        rejection_reason: formData.reason,
      });
      toast({
        description: "Ths application has been rejected",
      });
      router.refresh();
    } catch (err) {
      const customError = new AppError(err);
      toast({
        description: customError.message,
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

  async function onBulkDeclineSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      if (!selectedLeave) {
        return toast({
          description: "Please selected atleast one leave",
        });
      }

      setIsRejectedLoading(true);
      await apiCaller.post("/api/companies-app/leave/approve/", {
        leave_ids: [selectedLeave.id],
        status: "Rejected",
        rejection_reason: formData.reason,
      });
      toast({
        description: "Ths application has been rejected",
      });
      router.refresh();
    } catch (err) {
      const customError = new AppError(err);
      toast({
        description: customError.message,
        variant: "destructive",
      });
    } finally {
      setIsRejectedLoading(false);
    }
  }

  const isPending = !isApproved && !isRejected;
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
                  Decline
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
          <AlertDialogFooter className="flex-row justify-center gap-4">
            <AlertDialogAction
              onClick={async (e) => {
                e.preventDefault();
                await onApproveLeave();
                setShowApprove(false);
              }}
              // className="bg-primary focus:ring-red-600">
              className={buttonVariants({
                variant: "outline",
                className:
                  "border border-[#14AE5C] text-[#14AE5C] hover:bg-[#14AE5C] hover:text-white",
              })}>
              {isApproveLoading && <Icons.loader className="mr-2" />}
              Approve
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showReject} onOpenChange={setShowReject}>
        <AlertDialogContent overlayClassName={cn(showPreview && "bg-black/0")}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Add Reason for Declination</AlertDialogTitle>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onRejectLeaveSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription>Add Reason for {employeeName}</FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Tell a little bit about why you are rejecting his/her leave"
                        className="w-full resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter className="flex-row justify-end gap-4">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive" type="submit">
                  {isRejectLoading && <Icons.loader className="mr-2" />}
                  Send Declination
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showBulkDecline} onOpenChange={setShowBulkDecline}>
        <AlertDialogContent overlayClassName={cn(showPreview && "bg-black/0")}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Add Reason for Declination</AlertDialogTitle>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onBulkDeclineSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription>
                      Add Reason for {selectedLeave?.employee.first_name}
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Tell a little bit about why you are rejecting his/her leave"
                        className="w-full resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter className="flex-col justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {selectedLeaves?.map((leaveReq) => {
                    const isSelected = selectedLeave?.id === leaveReq.id;
                    return (
                      <div
                        className={cn(
                          "flex flex-wrap items-center gap-2 rounded-full border px-1.5 py-1",
                          isSelected && "bg-black",
                        )}>
                        <MemberAvatar
                          member={{
                            id: leaveReq.employee.id,
                            first_name: leaveReq.employee.first_name,
                            profile_picture: leaveReq.employee.profile_picture,
                          }}
                          className="size-6 first:ml-0"
                        />
                        <span
                          className={cn("cursor-pointer", isSelected && "text-white")}
                          onClick={() => setSelectedLeave(leaveReq)}>
                          {leaveReq.employee.first_name}
                        </span>
                        <Icons.close
                          size={18}
                          className={cn("cursor-pointer text-black", isSelected && "text-white")}
                          onClick={() => {
                            if (handleSelectLeave) handleSelectLeave(leaveReq);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end gap-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button variant="destructive" type="submit">
                    {isRejectLoading && <Icons.loader className="mr-2" />}
                    Send Declination
                  </Button>
                </div>
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
        <AlertDialogContent className={cn(showReject && "hidden")}>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-center text-center">
              {isApproved ? (
                <div className="flex items-center space-x-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#14AE5C]">
                    <Icons.check className="text-white" />
                  </span>
                  <span className="font-medium text-[#14AE5C]">Approved</span>
                </div>
              ) : isRejected ? (
                <div className="flex items-center space-x-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#E8595A]">
                    <Icons.close className="text-white" />
                  </span>
                  <span className="font-medium text-[#E8595A]">Declined</span>
                </div>
              ) : (
                <p>{selectedLeaves?.length ? "Manage Requests" : "Review Leave Request"}</p>
              )}
              {/* You are reviewing leave application of {employeeName} */}
            </AlertDialogTitle>
            {/* <AlertDialogDescription className="text-center"> */}
            {/*   You can later mark this leave application as approved or rejected. */}
            {/* </AlertDialogDescription> */}
          </AlertDialogHeader>
          <Card className="border-none shadow-none">
            {leaveRequest && (
              <CardContent className="space-y-6 p-0 text-sm">
                <div className="">
                  <Label>Name</Label>
                  <Input
                    disabled
                    placeholder={leaveRequest.employee.first_name}
                    className="rounded-none border-black border-x-transparent border-t-transparent px-0 disabled:opacity-100"
                  />
                </div>
                <div>
                  <Label>Department</Label>
                  <Input
                    disabled
                    placeholder={leaveRequest.employee.department}
                    className="rounded-none border-black border-x-transparent border-t-transparent px-0 disabled:opacity-100"
                  />
                </div>
                <div>
                  <Label>Leave Type</Label>
                  <Input
                    disabled
                    placeholder={leaveRequest.leave_type}
                    className="rounded-none border-black border-x-transparent border-t-transparent px-0 disabled:opacity-100"
                  />
                </div>
                {isPending ? (
                  <div>
                    <Label>Leave Balance</Label>
                    <Input
                      disabled
                      placeholder={String(leaveRequest.employee.leave_balance)}
                      className="rounded-none border-black border-x-transparent border-t-transparent px-0 disabled:opacity-100"
                    />
                  </div>
                ) : null}
                <div>
                  <Label>Reason for Leave</Label>
                  <Textarea
                    disabled
                    placeholder={leaveRequest.reason}
                    className="mt-2 resize-none disabled:opacity-100"
                  />
                  {/* <Input */}
                  {/*   disabled */}
                  {/*   placeholder={leaveRequest.reason} */}
                  {/*   className="rounded-none border-black border-x-transparent border-t-transparent px-0 disabled:opacity-100" */}
                  {/* /> */}
                  <div className="mt-8 flex gap-4">
                    <div className="flex flex-col gap-2">
                      <Label>Date Requested</Label>
                      <Input
                        disabled
                        placeholder={formatISODate(leaveRequest.start_date)}
                        className="disabled:opacity-100"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Duration</Label>
                      <Input
                        disabled
                        placeholder={leaveRequest.leave_duration || "-"}
                        className="disabled:opacity-100"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
            <div className="flex flex-wrap gap-2">
              {selectedLeaves?.map((leaveReq) => (
                <div className="flex flex-wrap items-center gap-2 rounded-full border px-1.5 py-1">
                  <MemberAvatar
                    member={{
                      id: leaveReq.employee.id,
                      first_name: leaveReq.employee.first_name,
                      profile_picture: leaveReq.employee.profile_picture,
                    }}
                    className="size-6 first:ml-0"
                  />
                  <span>{leaveReq.employee.first_name}</span>
                  <Icons.close
                    size={18}
                    className="cursor-pointer text-black"
                    onClick={() => {
                      if (handleSelectLeave) handleSelectLeave(leaveReq);
                    }}
                  />
                </div>
              ))}
            </div>
          </Card>
          <AlertDialogFooter className="mt-4 flex">
            {!isApproved && !isRejected ? (
              <div className="flex w-full justify-center gap-10">
                <Button
                  variant="outline"
                  className="border border-[#14AE5C] text-[#14AE5C] hover:bg-[#14AE5C] hover:text-white"
                  onClick={async () => {
                    await onApproveLeave();
                    if (setShowBulkAction) {
                      setShowBulkAction(false);
                    }
                    setShowPreview(false);
                  }}>
                  {isApproveLoading && <Icons.loader className="mr-2" />}
                  {selectedLeaveIDs?.length ? "Approve All" : "Approve Leave"}
                </Button>
                {selectedLeaveIDs?.length ? (
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => {
                      setShowBulkDecline(true);
                    }}
                    type="submit">
                    {isRejectLoading && <Icons.loader className="mr-2" />}
                    Decline All
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => {
                      setShowReject(true);
                    }}
                    type="submit">
                    {isRejectLoading && <Icons.loader className="mr-2" />}
                    Reject Leave
                  </Button>
                )}
              </div>
            ) : null}
            {/* {!isApproved && ( */}
            {/*   <Button */}
            {/*     onClick={async () => { */}
            {/*       await onApproveLeave(); */}
            {/*       if (setShowBulkAction) { */}
            {/*         setShowBulkAction(false); */}
            {/*       } */}
            {/*       setShowPreview(false); */}
            {/*     }}> */}
            {/*     {isApproveLoading && <Icons.loader className="mr-2" />} */}
            {/*     Approve Leave */}
            {/*   </Button> */}
            {/* )} */}
            {/* {!isRejected && ( */}
            {/*   <Button */}
            {/*     variant="destructive" */}
            {/*     onClick={() => { */}
            {/*       setShowReject(true); */}
            {/*     }} */}
            {/*     type="submit"> */}
            {/*     {isRejectLoading && <Icons.loader className="mr-2" />} */}
            {/*     Reject Leave */}
            {/*   </Button> */}
            {/* )} */}
          </AlertDialogFooter>
          <AlertDialogAction
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "absolute right-2 top-2 h-auto p-2 hover:bg-transparent",
              }),
            )}>
            <Icons.close className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
