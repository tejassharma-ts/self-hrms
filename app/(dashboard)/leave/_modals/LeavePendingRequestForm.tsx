'use client';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  name: z.string(),
  department: z.string(),
  leaveType: z.string(),
  reasonForLeave: z.string(),
  dateRequested: z.string(),
  duration: z.string(),
});

export function LeavePendingRequestForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<z.infer<typeof FormSchema> | null>(null);
  const [leaveIds, setLeaveIds] = useState<string[]>([]); // State for leave IDs

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
      department: "",
      leaveType: "",
      reasonForLeave: "",
      dateRequested: "",
      duration: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/companies-app/company/leaves/");
        const result = response.data;
        
        const leaveRequest = result.leaves_request[0];

        setData({
          name: `${leaveRequest.employee.first_name} ${leaveRequest.employee.last_name}`,
          department: leaveRequest.employee.department,
          leaveType: leaveRequest.leave_type,
          reasonForLeave: leaveRequest.reason,
          dateRequested: leaveRequest.start_date,
          duration: `${leaveRequest.start_date} to ${leaveRequest.end_date}`,
        });

        setLeaveIds(leaveRequest.leave_ids);
      } catch (error) {
        setData({
          name: "John Doe",
          department: "Human Resources",
          leaveType: "Vacation",
          reasonForLeave: "Family vacation",
          dateRequested: "2024-09-03",
          duration: "2024-09-03 to 2024-09-10",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const onApprove = async () => {
    try {
      const response = await axios.post("/api/companies-app/leave/approve/", {
        leave_ids: leaveIds,
        status: "Approved",
      });

      alert("Leave approved successfully!");
    } catch (error) {
      console.error("Error approving leave:", error);
      alert("Failed to approve leave.");
    }
  };

  return (
    <Card className="rounded-lg">
      <CardHeader className="flex justify-center">
        <CardTitle className="text-center">Review Leave Request</CardTitle>
      </CardHeader>
      <CardContent>
        {!isLoading && data ? (
          <Form {...form} >
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[18px]">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border-t-0 rounded-none border-l-0 border-r-0 border-b-2 border-black"
                        readOnly
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[18px]">Department</FormLabel>
                    <FormControl>
                      <Input
                        className="border-t-0 rounded-none border-l-0 border-r-0 border-b-2 border-black"
                        readOnly
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leaveType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[18px]">Leave Type</FormLabel>
                    <FormControl>
                      <Input
                        className="border-t-0 rounded-none border-l-0 border-r-0 border-b-2 border-black"
                        readOnly
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reasonForLeave"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[18px]">Reason for Leave</FormLabel>
                    <FormControl>
                      <Textarea
                        readOnly
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dateRequested"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-[18px]">Date Requested</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-[18px]">Duration</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter className="flex justify-between">
                <Button onClick={()=>onApprove()} type="submit" variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                  Approve Leave
                </Button>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                  Decline Leave
                </Button>
              </CardFooter>
            </form>
          </Form>
        ) : (
          <div>Loading...</div>
        )}
      </CardContent>
    </Card>
  );
}