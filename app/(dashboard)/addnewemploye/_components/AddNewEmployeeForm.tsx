"use client";
import { useEffect, useState } from "react";
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/app/(auth)/auth/_components/PasswordInput";
import { apiCaller } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import { useClientAuth } from "@/context/auth-context";
import { Icons } from "@/components/Icons";
import useEmployeeStore from "@/model/employee";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";

const employeeSchema = z.object({
  first_name: z.string().max(50, "First name cannot exceed 50 characters"),
  last_name: z.string().max(50, "Last name cannot exceed 50 characters"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
  email: z.string().email("Please enter a valid email address"),
  official_email: z.string().email("Please enter a valid official email address"),
  phone_number: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  official_phone_number: z
    .string()
    .regex(/^\d{10}$/, "Official phone number must be exactly 10 digits"),
  emergency_phone_number: z
    .string()
    .regex(/^\d{10}$/, "Emergency contact number must be exactly 10 digits"),
  address: z.string().max(100, "Address cannot exceed 100 characters"),
  permanent_address: z
    .string()
    .max(100, "Permanent address cannot exceed 100 characters")
    .optional(),
  date_of_birth: z.string().nonempty("Date of birth is required"),
  position: z.string().max(100, "Position title cannot exceed 100 characters").optional(),
  salary: z
    .string()
    .refine((val) => !val || !isNaN(parseFloat(val)), {
      message: "Salary must be a valid numeric value",
    })
    .refine((val) => !val || parseFloat(val) > 0, {
      message: "Salary must be greater than 0",
    }),
  is_hr: z.boolean().default(false).optional(),
  department: z.string().max(100, "Department name cannot exceed 100 characters").optional(),
  gender: z.string().max(25, "Gender description cannot exceed 25 characters").optional(),
  profile_picture: z.any().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

interface AddNewEmployeeFormProps {
  onComplete: () => void;
}

const designations = [
  "Software Engineer",
  "Product Manager",
  "UI/UX Designer",
  "Data Analyst",
  "DevOps Engineer",
  "Marketing Specialist",
];

const departments = ["Engineering", "Product", "Design", "Data Science", "Operations", "Marketing"];

const AddNewEmployeeForm = ({
  onComplete,
  setForms,
  employee,
}: {
  onComplete: any;
  setForms: any;
  employee?: any;
}) => {
  const { setEmployeeId } = useEmployeeStore();
  const { authUser, authCompany } = useClientAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [autoPassword, setAutoPassword] = useState(false);
  const [dobRequired, setDobRequired] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<EmployeeFormValues>({
    mode: "onChange",
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      first_name: employee?.first_name || undefined,
      last_name: employee?.last_name || undefined,
      password: employee?.password || undefined,
      email: employee?.email || undefined,
      official_email: employee?.official_email || undefined,
      phone_number: employee?.phone_number || undefined,
      official_phone_number: employee?.official_phone_number || undefined,
      emergency_phone_number: employee?.emergency_phone_number || undefined,
      address: employee?.address || undefined,
      permanent_address: employee?.permanent_address || undefined,
      date_of_birth: employee?.date_of_birth || undefined,
      position: employee?.position || undefined,
      salary: employee?.salary || undefined,
      is_hr: employee?.is_hr || false,
      department: employee?.department || undefined,
      gender: employee?.gender || undefined,
    },
  });

  async function onSubmit(data: EmployeeFormValues) {
    try {
      setIsLoading(true);
      if (!employee) {
        const res = await apiCaller.post("/api/companies-app/company/add-employee/", {
          ...data,
          company_id: authUser?.employee_profile.company.id || authCompany?.id,
        });
        setEmployeeId(res.data.id);

        const params = new URLSearchParams(searchParams);
        params.set("employeeID", res.data.id);
        router.replace(`${pathname}?${params.toString()}`);

        toast({
          description: "Employee successfully added",
        });
      } else {
        const res = await apiCaller.patch(
          "/api/companies-app/company/add-employee/",
          {
            // TODO: not the perfect use of patch api
            ...data,
          },
          {
            params: {
              employee_id: employee.id,
            },
          },
        );
        setEmployeeId(res.data.id);
        toast({
          description: "Employee successfully added",
        });
      }
      onComplete();
    } catch (err) {
      toast({
        description: "Something went very wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const { first_name, date_of_birth } = form.getValues();

    if (autoPassword) {
      if (!date_of_birth) {
        setDobRequired(true);
        return;
      }
      setDobRequired(false);
      const cleanedFirstName = first_name?.replace(/\s+/g, "");
      const dob = new Date(date_of_birth).toISOString().split("T")[0].replace(/-/g, "");
      const generatedPassword = `${cleanedFirstName?.toLowerCase()}${dob}`;
      setGeneratedPassword(generatedPassword);
      form.setValue("password", generatedPassword);
    } else {
      setDobRequired(false);
    }
  }, [autoPassword, form.getValues, form.setValue, form.watch("date_of_birth")]);

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
                      <FormLabel>
                        Employee Password
                        <input
                          type="checkbox"
                          checked={autoPassword}
                          onChange={() => setAutoPassword(!autoPassword)}
                          className="ms-2"
                        />
                        Auto Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          value={autoPassword ? generatedPassword : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem>
                      {dobRequired && (
                        <p className="text-sm text-red-600">
                          Please select a date of birth to use auto password.
                        </p>
                      )}
                      <FormLabel>Date Of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" placeholder="Select Date" {...field} />
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
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
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
                  name="official_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Official E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Official Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personal E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Personal Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="official_phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Official Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Official Phone Number" {...field} />
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
                      <FormLabel>Personal Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Personal Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergency_phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Emergency Phone Number" {...field} />
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
                name="permanent_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permanent Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Address" {...field} />
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
                      <FormLabel>Designation</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a designation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {designations.map((designation) => (
                            <SelectItem key={designation} value={designation}>
                              {designation}
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((department) => (
                            <SelectItem key={department} value={department}>
                              {department}
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
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Salary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_hr"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="">HR Department</FormLabel>
                        <FormDescription className="text-xs">
                          Enable this option if the employee belongs to the HR department
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button type="submit" disabled={isLoading} className="mt-2">
            {isLoading && <Icons.loader />}
            {!employee ? "Save and Continue" : "Update and Continue"}
          </Button>
        </form>
      </Form>
      {/* <SalaryDetailsForm /> */}
    </div>
  );
};

export default AddNewEmployeeForm;
