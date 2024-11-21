"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import EmployeeSelector from "./EmployeeSelector";
import { apiCaller } from "@/lib/auth";
import { Icons } from "@/components/Icons";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  employee: z.string().min(2).max(50),
  pay_date: z.instanceof(Date),
  arrears_amount: z.string(),
  arrears_month: z.instanceof(Date),
});

export default function AddPayroll() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee: "",
      pay_date: undefined,
      arrears_amount: "",
      arrears_month: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const res = await apiCaller.get("/api/payroll_app/detail-salary-structures/", {
        params: {
          employee_id: values.employee,
        },
      });
      const salary = res.data;

      await apiCaller.post("/api/payroll_app/payrolls/", {
        ...values,
        pay_date: format(values.pay_date, "yyyy-MM-dd"),
        arrears_month: format(values.arrears_month, "yyyy-MM-dd"),
        salary_structure: salary.id,
      });
      router.refresh();
      setOpen(false);
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        description:
          "Either the employee's salary structure has not been created, or there has been an error on our part.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mb-2 self-end">
        <Button>Create Payroll</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Create Payroll</DialogTitle>
          <Form {...form}>
            {/* @ts-ignore */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="employee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Name</FormLabel>
                    <FormControl>
                      <EmployeeSelector onChange={field.onChange} />
                      {/* <Input placeholder="Enter employee name" {...field} /> */}
                    </FormControl>
                    {/* <FormDescription>Enter the full name of the employee</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pay_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Payout Date</FormLabel>
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-gray-500",
                            )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : "Select date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const today = new Date();
                            const startOfCurrentMonth = new Date(
                              today.getFullYear(),
                              today.getMonth(),
                              1,
                            );
                            return date >= startOfCurrentMonth || date < new Date("1900-01-01");
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>Select the date of payment</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arrears_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arrears Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter arrears amount" {...field} />
                    </FormControl>
                    {/* <FormDescription>Enter the total arrears amount</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arrears_month"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Arrears month</FormLabel>
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-gray-500",
                            )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : "Select date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => {
                            const today = new Date();
                            const startOfCurrentMonth = new Date(
                              today.getFullYear(),
                              today.getMonth(),
                              1,
                            );

                            return date >= startOfCurrentMonth || date < new Date("1900-01-01");
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>Select the date of payment</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && <Icons.loader />}
                Create Payroll
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
