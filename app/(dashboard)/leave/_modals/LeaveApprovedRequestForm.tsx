'use client';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const FormSchema = z.object({
  name: z.string(),
  department: z.string(),
  leaveType: z.string(),
  reasonForLeave: z.string(),
  dateRequested: z.string(),
  duration: z.string(),
});

export function LeaveApprovedRequestView() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<z.infer<typeof FormSchema> | null>(null);

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
        const response = await fetch("/api/companies-app/company/leaves/");
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        
        const leaveRequest = result.leaves_request[0];

        setData({
          name: `${leaveRequest.employee.first_name} ${leaveRequest.employee.last_name}`,
          department: leaveRequest.employee.department,
          leaveType: leaveRequest.leave_type,
          reasonForLeave: leaveRequest.reason,
          dateRequested: leaveRequest.start_date,
          duration: `${leaveRequest.start_date} to ${leaveRequest.end_date}`,
        });
      } catch (error) {
        // Fallback to dummy data
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

  return (
    <Card className="rounded-lg">
      <CardHeader className="flex justify-center">
        <CardTitle className="text-center">Review Leave Request</CardTitle>
      </CardHeader>
      <CardContent>
        {!isLoading && data ? (
          <Form {...form}>
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
            </form>
          </Form>
        ) : (
          <div>Loading...</div>
        )}
      </CardContent>
    </Card>
  );
}
