"use client";

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
import MultipleSelector from "@/components/ui/multi-select";
import useAuthStore from "@/model/auth";
import { useClientAuth } from "@/context/auth-context";
import DepartmentSelector from "@/components/department-selector";
import { toast } from "@/hooks/use-toast";

type Employee = {
  id: string;
  name: string;
  profile_picture: string;
  department: string;
  label: string;
  value: string;
};

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  qualification: z.string().min(1, "Qualification is required"),
  address: z.string().min(1, "Address is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  position_applied: z.string().min(1, "Position is required"),
  previous_company_name: z.string().optional(),
  previous_salary: z.string().optional(),
  interview_date: z.date(),
  time: z.string(),
  status: z.enum(["In Progress", "Completed", "Pending"]),
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
  department: z.string().min(1, "Department is required"),
  meeting_link: z.string(),
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

export default function ScheduleInterview({
  setShowDialog,
  setMeetings: setInterviews,
}: {
  setShowDialog: any;
  setMeetings: any;
}) {
  const { authUser, authCompany } = useClientAuth();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
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
      const res = await apiCaller.post("/api/companies-app/schedule-interview/", {
        ...values,
        is_selected: undefined,
        interview_date: combineDateAndTime(values.interview_date, values.time),
        status: "Scheduled",
      });
      // @ts-ignore
      setInterviews((pre) => [...pre, res.data.interview]);
      toast({
        description: res.data.message,
      });
      setShowDialog(false);
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSearchHandler(value: string) {
    try {
      const res = await apiCaller.get("/api/employees-app/employees-search/", {
        params: {
          search: value,
        },
      });

      const employees = res.data.map((employee: Employee) => ({
        ...employee,
        label: employee.name,
        value: employee.name,
      }));

      return employees;
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Input type="number" {...field} />
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

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading && <Icons.loader className="ml-2" />}
          Schedule Interview
        </Button>
      </form>
    </Form>
  );
}
