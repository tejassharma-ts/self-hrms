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
import { EmployeeProfileDetail } from "@/types/types";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

const employeeSchema = z.object({
  first_name: z.string().max(50, "First name must be 50 characters or less").optional(),
  last_name: z.string().max(50, "Last name must be 50 characters or less").optional(),
  password: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  official_email: z.string().email("Invalid email address").optional(),
  phone_number: z.string().max(10, "Phone number must be 10 digits or less").optional(),
  official_phone_number: z.string().max(10, "Phone number must be 10 digits or less").optional(),
  emergency_phone_number: z.string().max(10, "Phone number must be 10 digits or less").optional(),
  address: z.string().optional(),
  permanent_address: z.string().optional(),
  date_of_birth: z.string().optional(),
  position: z.string().max(100, "Position must be 100 characters or less").optional(),
  salary: z.string().optional(),
  is_hr: z.boolean().default(false).optional(),
  department: z.string().max(100, "Department must be 100 characters or less").optional(),
  bank_name: z.string().max(100, "Bank name must be 100 characters or less").optional(),
  account_number: z.string().max(17, "Account number must be 17 characters or less").optional(),
  ifsc_code: z.string().max(12, "IFSC code must be 12 characters or less").optional(),
  aadhar_number: z.string().max(12, "Aadhar number must be 12 digits").optional(),
  pan_number: z.string().max(10, "PAN number must be 10 characters").optional(),
  gender: z.string().max(25, "Gender must be 25 characters or less").optional(),
  profile_picture: z.any().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const AddNewEmployeeForm = ({
  onComplete,
  setForms,
  employee,
}: {
  onComplete: any;
  setForms: any;
  employee?: EmployeeProfileDetail;
}) => {
  const { setEmployeeId } = useEmployeeStore();
  const { authUser, authCompany } = useClientAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [autoPassword, setAutoPassword] = useState(false);
  const [dobRequired, setDobRequired] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const router = useRouter();

  const form = useForm<EmployeeFormValues>({
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
      bank_name: employee?.bank_name || undefined,
      account_number: employee?.account_number || undefined,
      ifsc_code: employee?.ifsc_code || undefined,
      aadhar_number: employee?.aadhar_number || undefined,
      pan_number: employee?.pan_number || undefined,
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
        toast({
          description: "Employee successfully added",
        });
      } else {
        const res = await apiCaller.patch(
          "/api/companies-app/company/add-employee/",
          {
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
      router.refresh();
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
    if (autoPassword) {
      const { first_name, date_of_birth } = form.getValues();
      if (!date_of_birth) {
        setDobRequired(true);
        return;
      }
      setDobRequired(false);
      const dob = new Date(date_of_birth).toISOString().split("T")[0].replace(/-/g, "");
      setGeneratedPassword(`${first_name?.toLowerCase()}${dob}`);
      form.setValue("password", `${first_name?.toLowerCase()}${dob}`);
    } else {
      setDobRequired(false);
    }
  }, [autoPassword, form.getValues, form.setValue]);

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
    </div>
  );
};

export default AddNewEmployeeForm;
