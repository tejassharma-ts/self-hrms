"use client";

import { Dispatch, SetStateAction } from "react";
import { cn, combineDateAndTime } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/Icons";
import { apiCaller } from "@/lib/auth";
import { useClientAuth } from "@/context/auth-context";
import DepartmentSelector from "@/components/department-selector";
import { toast } from "@/hooks/use-toast";
import useEventStore from "@/model/events";

type Employee = {
  id: string;
  name: string;
  profile_picture: string;
  department: string;
  label: string;
  value: string;
};

const formSchema = z.object({
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters long.")
    .max(100, "First name cannot exceed 100 characters."),
  last_name: z
    .string()
    .min(5, "Last name must be at least 5 characters long.")
    .max(100, "Last name cannot exceed 100 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().refine((val) => /^[0-9]+$/.test(val) && val.length >= 10 && val.length <= 15, {
    message: "Phone number must be between 10 and 15 digits and contain only numbers.",
  }),
  qualification: z
    .string()
    .min(3, "Qualification must be at least 3 characters long.")
    .max(200, "Qualification cannot exceed 200 characters."),
  address: z.string().min(1, "Address is required."),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required." }),
  position_applied: z.string().min(1, "Position applied for is required."),
  previous_company_name: z.string().optional(),
  previous_salary: z
    .string()
    .refine(
      (val) => {
        const parsed = parseFloat(val);
        return !isNaN(parsed) && parsed > 0 && parsed <= 99999999.99;
      },
      {
        message: "Previous salary must be a positive number not exceeding 99,999,999.99.",
      },
    )
    .optional(),
  interview_date: z.date({
    invalid_type_error: "Please provide a valid interview date (e.g., YYYY-MM-DD).",
  }),
  time: z.string().min(1, "Interview time is required."),
  status: z.enum(["In Progress", "Completed", "Pending"], {
    required_error: "Interview status is required.",
  }),
  is_selected: z.enum([
    "Shortlisted",
    "Rejected",
    "Interview In Process",
    "On Hold",
    "Under Review",
    "Selected",
    "Offered",
    "Offer Accepted",
    "Offer Declined",
    "Awaiting Interview",
    "Awaiting Feedback",
    "Hired",
    "Background Check In Progress",
    "Interview Rescheduled",
    "Interview No Show",
    "Withdrawn",
    "Talent Pooled",
  ]),
  department: z.string().min(1, "Department is required."),
  meeting_link: z
    .string()
    .url({ message: "Please provide a valid meeting link (e.g., https://example.com)." }),
});

const selectionStatus = [
  "Shortlisted",
  "Rejected",
  "Interview In Process",
  "On Hold",
  "Under Review",
  "Selected",
  "Offered",
  "Offer Accepted",
  "Offer Declined",
  "Awaiting Interview",
  "Awaiting Feedback",
  "Hired",
  "Background Check In Progress",
  "Interview Rescheduled",
  "Interview No Show",
  "Withdrawn",
  "Talent Pooled",
];

type ScheduleInterviewProps = {
  setShowDialog: (value: boolean) => void;
};

export default function ScheduleInterview({ setShowDialog }: ScheduleInterviewProps) {
  const { authUser, authCompany } = useClientAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { interviews, setInterviews } = useEventStore();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "Tejas",
      last_name: "Sharma",
      email: "tejassharma2021@outlook.com",
      phone: "6398284253",
      qualification: "Graduation",
      address: "Earth",
      gender: "Male",
      position_applied: "Eng",
      previous_company_name: "Sun",
      previous_salary: "300000",
      interview_date: new Date(),
      status: "Pending",
      is_selected: undefined,
      department: "",
      meeting_link: "http://localhost:3000/dashboard",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // @ts-ignore
      values.company_id = authUser?.employee_profile.company.id! || authCompany?.id!;

      setIsLoading(true);
      const res = await apiCaller.post("api/companies-app/api-meeting-interview/", {
        ...values,
        type: "interview",
        // is_selected: undefined,
        interview_date: combineDateAndTime(values.interview_date, values.time),
        status: "Scheduled",
      });

      if (
        format(res.data.interview.interview_date, "yyy MM dd") ===
        format(values.interview_date, "yyyy MM dd")
      ) {
        const latestInterviews = [...interviews, res.data.interview];
        setInterviews(latestInterviews);
      }
      toast({
        description: res.data.message,
      });
      setShowDialog(false);
    } catch (err) {
      console.log("err", err);
      toast({
        variant: "destructive",
        description:
          "The form fields are invalid, or an interview has already been scheduled with the provided email address.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="meeting_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting link</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="qualification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qualification</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position_applied"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position Applied</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="previous_company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="previous_salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous Salary</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="interview_date"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Interview Date</FormLabel>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}>
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="is_selected"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selection Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selection status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectionStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <DepartmentSelector onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-center">
          <Button disabled={isLoading} type="submit" className="w-full max-w-xs rounded-full">
            {isLoading && <Icons.loader className="ml-2" />}
            Schedule Interview
          </Button>
        </div>
      </form>
    </Form>
  );
}
