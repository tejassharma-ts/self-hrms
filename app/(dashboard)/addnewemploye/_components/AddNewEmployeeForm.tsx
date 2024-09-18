"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/app/(auth)/auth/_components/PasswordInput";
import { apiCaller } from "@/lib/auth";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { useClientAuth } from "@/context/auth-context";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Icons } from "@/components/Icons";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import useEmployeeStore from "@/model/employee";

const employeeSchema = z.object({
  first_name: z.string().max(50, "First name must be 50 characters or less"),
  last_name: z.string().max(50, "Last name must be 50 characters or less"),
  password: z.string(),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().max(10, "Phone number must be 10 digits or less"),
  address: z.string(),
  date_of_birth: z.string(),
  position: z.string().max(100, "Position must be 100 characters or less"),
  salary: z.number().positive("Salary must be a positive number"),
  is_hr: z.boolean().default(false),
  department: z.string().max(100, "Department must be 100 characters or less"),
  bank_name: z.string().max(100, "Bank name must be 100 characters or less"),
  account_number: z.string().max(17, "Account number must be 17 characters or less"),
  ifsc_code: z.string().max(12, "IFSC code must be 12 characters or less"),
  aadhar_number: z.string().max(12, "Aadhar number must be 12 digits"),
  pan_number: z.string().max(10, "PAN number must be 10 characters"),
  gender: z.string().max(25, "Gender must be 25 characters or less"),
  profile_picture: z.any(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const AddNewEmployeeForm = ({ setForms }: { setForms: any }) => {
  const { setEmployeeId } = useEmployeeStore();
  const { authUser, authCompany } = useClientAuth();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, refresh } = useRouter();

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      first_name: "John",
      last_name: "Doe",
      password: "cosmonaut",
      email: "john.doe@example.com",
      phone_number: "1234567890",
      address: "123 Main St, Anytown, AN 12345",
      date_of_birth: "1990-01-01",
      position: "Software Developer",
      salary: 75000,
      is_hr: false,
      department: "Engineering",
      bank_name: "National Bank",
      account_number: "1234567890123456",
      ifsc_code: "NATL0001234",
      aadhar_number: "123456789012",
      pan_number: "ABCDE1234F",
      gender: "male",
    },
  });

  async function onSubmit(data: EmployeeFormValues) {
    try {
      setIsLoading(true);
      const res = await apiCaller.post("api/companies-app/company/add-employee/", {
        ...data,
        company_id: authUser?.employee_profile.company.id || authCompany?.id,
      });
      setEmployeeId(res.data.id);
      toast({
        description: "Employee successfully added",
      });
    } catch (err) {
      toast({
        description: "Something went very wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-white p-8 shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8">
            {/* Basic Info Section */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Basic Info</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter First Name" {...field} />
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
                        <Input placeholder="Enter Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
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
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact Info Section */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Contact Info</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Address</h2>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Employment Details Section */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Employment Details</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Position" {...field} />
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
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Department" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Salary"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_hr"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <input type="checkbox" checked={field.value} onChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Is HR</FormLabel>
                        <FormDescription>Check if this employee is part of HR</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Bank Details Section */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Bank Details</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="bank_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Bank Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="account_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Account Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ifsc_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IFSC Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter IFSC Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Document Details Section */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Document Details</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="aadhar_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhar Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Aadhar Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pan_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PAN Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter PAN Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* <FormField */}
          {/*   control={form.control} */}
          {/*   name="profile_picture" */}
          {/*   render={({ field: { value, onChange, ...field } }) => ( */}
          {/*     <FormItem> */}
          {/*       <FormLabel>Profile Picture</FormLabel> */}
          {/*       <FormControl> */}
          {/*         <Input */}
          {/*           placeholder="" */}
          {/*           value={value?.fileName} */}
          {/*           id="file" */}
          {/*           type="file" */}
          {/*           {...field} */}
          {/*           onChange={(event) => { */}
          {/*             if (!event.target.files) return; */}
          {/*             onChange(event.target.files[0]); */}
          {/*           }} */}
          {/*         /> */}
          {/*       </FormControl> */}
          {/*       <FormMessage /> */}
          {/*     </FormItem> */}
          {/*   )} */}
          {/* /> */}

          <Button type="submit" disabled={isLoading} className="mt-2">
            {isLoading && <Icons.loader />}
            Save and Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddNewEmployeeForm;
