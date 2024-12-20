import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { custom, z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import EmployeeSelector from "../../payroll/_components/EmployeeSelector";
import { apiCaller } from "@/lib/auth";
import AppError from "@/lib/error";
import { useState } from "react";
import { Icons } from "@/components/Icons";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  employee_id: z.string().uuid({
    message: "Invalid Employee ID.",
  }),
  leave_type: z.string().min(1, {
    message: "Leave type is required.",
  }),
  start_date: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid start date.",
  }),
  end_date: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid end date.",
  }),
  reason: z
    .string()
    .min(1, {
      message: "Reason is required.",
    })
    .optional(),
});

type LeaveFormProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function LeaveForm({ open, setOpen }: LeaveFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      employee_id: "",
      leave_type: "",
      start_date: "",
      end_date: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      await apiCaller.post("/api/companies-app/hr-assigned-leave/", values);
      toast({
        description: "Leave has been created successfully",
      });
      setOpen(false);
      router.refresh();
    } catch (err) {
      const customError = new AppError(err);
      toast({
        description: customError.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="employee_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <EmployeeSelector onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leave_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leave Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Leave Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sick">Sick</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Maternity">Maternity</SelectItem>
                    <SelectItem value="Paternity">Paternity</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input placeholder="Enter Reason" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="mx-auto w-full max-w-[10rem]">
          {loading ? <Icons.loader /> : null}
          Submit
        </Button>
      </form>
    </Form>
  );
}
