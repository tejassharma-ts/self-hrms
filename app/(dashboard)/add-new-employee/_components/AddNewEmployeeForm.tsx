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
import { PasswordInput } from "@/app/(auth)/auth/_components/PasswordInput";
import { apiCaller } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import { useClientAuth } from "@/context/auth-context";
import { Icons } from "@/components/Icons";
import useEmployeeStore from "@/model/employee";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAddEmployeeStore } from "@/model/add-employee";
import { isString, isValidUrl } from "@/lib/string";
import DepartmentSelector from "@/components/department-selector";

const phoneNumberSchema = z
  .string()
  .refine((val) => /^[0-9]+$/.test(val) && val.length >= 10 && val.length <= 15, {
    message: "Phone number must be between 10 and 15 digits and contain only numbers.",
  });

const employeeSchema = z.object({
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters long.")
    .max(50, "First name cannot exceed 100 characters."),
  last_name: z
    .string()
    .min(3, "Last name must be at least 3 characters long.")
    .max(50, "Last name cannot exceed 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone_number: phoneNumberSchema,
  address: z
    .string()
    .min(5, "Address name must be at least 5 characters long.")
    .max(100, "Address cannot exceed 100 characters"),
  permanent_address: z
    .string()
    .min(5, "Address name must be at least 5 characters long.")
    .max(100, "Permanent address cannot exceed 100 characters")
    .optional(),
  date_of_birth: z.date(),
  position: z.string().max(100, "Position title cannot exceed 100 characters").optional(),
  salary: z.string().refine(
    (val) => {
      const parsed = parseFloat(val);
      return !isNaN(parsed) && parsed > 0 && parsed <= 99999999.99;
    },
    {
      message: "Previous salary must be a positive number not exceeding 99,999,999.99.",
    },
  ),
  password: z.string().min(5, "Password must be at least 5 characters long"),
  department: z.string().max(100, "Department name cannot exceed 100 characters").optional(),
  is_hr: z.boolean().default(false).optional(),
  profile_picture: z.union([z.instanceof(File), z.string()]).optional(),
  gender: z.string().max(25, "Gender description cannot exceed 25 characters").optional(),
  emergency_phone_number: phoneNumberSchema,
  official_phone_number: phoneNumberSchema,
  official_email: z.string().email("Please enter a valid official email address"),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const designations = [
  "Software Engineer",
  "Product Manager",
  "UI/UX Designer",
  "Data Analyst",
  "DevOps Engineer",
  "Marketing Specialist",
];

export default function AddNewEmployeeForm({ employee }: { employee?: any }) {
  const form = useForm<EmployeeFormValues>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      first_name: employee?.first_name,
      last_name: employee?.last_name,
      password: employee?.password,
      email: employee?.email,
      official_email: employee?.official_email,
      phone_number: employee?.phone_number,
      official_phone_number: employee?.official_phone_number,
      emergency_phone_number: employee?.emergency_phone_number,
      address: employee?.address,
      permanent_address: employee?.permanent_address,
      date_of_birth: employee?.date_of_birth ? new Date(employee?.date_of_birth) : undefined,
      position: employee?.position,
      salary: employee?.salary,
      is_hr: employee?.is_hr || true,
      department: employee?.department,
      gender: employee?.gender,
      profile_picture: employee?.profile_picture || undefined,
    },
  });
  const { authUser, authCompany } = useClientAuth();

  const { setEmployeeField } = useAddEmployeeStore();

  const [isLoading, setIsLoading] = useState(false);

  const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
    accept: {
      "image/*": [],
    },
    noClick: true,
    noKeyboard: true,
    maxSize: 5 * (1024 * 1024),
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length) return;
      const file = acceptedFiles[0];
      form.setValue(
        "profile_picture",
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
    },
    maxFiles: 1,
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!employee) return;
    setEmployeeField("personal", employee);
  }, [employee]);

  async function onSubmit(data: EmployeeFormValues) {
    try {
      setIsLoading(true);
      if (!employee) {
        // const formData = new FormData();
        //
        // Object.keys(data).forEach((key) => {
        //   // @ts-ignore
        //   formData.append(key, data[key]);
        // });
        //
        // formData.append("date_of_birth", format(data.date_of_birth, "yyyy-MM-dd"));
        // formData.append("company_id", authUser?.employee_profile.company.id! || authCompany?.id!);

        // const res = await apiCaller.post("/api/companies-app/company/add-employee/", formData);
        const res = await apiCaller.postForm("/api/companies-app/company/add-employee/", {
          ...data,
          date_of_birth: format(data.date_of_birth, "yyyy-MM-dd"),
          company_id: authUser?.employee_profile.company.id! || authCompany?.id!,
        });

        toast({
          description: "Employee successfully added",
        });

        setEmployeeField("personal", res.data);

        const params = new URLSearchParams(searchParams);
        params.set("employee_id", res.data.id);
        params.set("active_form", "bank-details");
        router.push(`${pathname}?${params.toString()}`);
      } else {
        // const formData = new FormData();

        // @ts-ignore
        // data.date_of_birth = format(data.date_of_birth, "yyyy-MM-dd");

        // Object.keys(employee).map((key) => {
        // @ts-ignore
        // if (data.hasOwnProperty(key) && employee[key] !== data[key]) {
        // for image because only expiry time updates IDK why but, additional check will do the job for now
        // if it is a valid url we can safely return without appending because if the assest has  really changed
        // it would be having blob object

        // @ts-ignore
        // if (isValidUrl(data[key])) return;

        // @ts-ignore
        // formData.append(key, data[key]);
        //   }
        // });

        await apiCaller.patch(
          "/api/companies-app/company/add-employee/",
          {
            ...data,
            department: undefined,
            profile_picture: data.profile_picture
              ? typeof data.profile_picture === "string"
                ? undefined
                : data.profile_picture
              : undefined,
            date_of_birth: format(data.date_of_birth, "yyyy-MM-dd"),
          },
          {
            params: {
              employee_id: employee.id,
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        toast({
          description: "Employee updated successfully",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        description: "Something went very wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path} className="text-sm font-medium text-destructive">
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  function authGeneratePassword() {
    const firstName = form.getValues("first_name");
    const lastName = form.getValues("last_name");
    const dob = form.getValues("date_of_birth");
    if (!firstName || !dob) {
      return toast({
        description:
          "Please give First name and DOB of the employee to generate password, Last name is optional",
      });
    }
    form.setValue(
      "password",
      [
        firstName.trim().replaceAll(" ", ""),
        lastName?.trim().replaceAll(" ", ""),
        format(dob, "yyyy_MM_dd"),
      ]
        .join("")
        .toLowerCase(),
    );
    form.trigger("password");
  }

  const profile = fileRejections.length === 0 && form.getValues("profile_picture");
  return (
    <Card className="rounded-md">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
            <FormField
              control={form.control}
              name="profile_picture"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mb-16 flex items-center space-x-8">
                      <div
                        {...getRootProps()}
                        className="relative size-40 overflow-hidden rounded-full bg-gray-500">
                        {profile ? (
                          <img
                            // @ts-ignore
                            src={isString(profile) ? profile : profile.preview}
                            className="absolute inset-0 h-full w-full object-cover"
                            onLoad={() => {
                              if (isString(profile)) return;

                              // @ts-ignore
                              URL.revokeObjectURL(profile.preview);
                            }}
                          />
                        ) : (
                          <img
                            src="/default-avatar.svg"
                            className="absolute inset-0 h-full w-full object-contain grayscale"
                          />
                        )}
                        <input
                          {...getInputProps({
                            onChange: (e) => field.onChange(e.target.files?.[0] || null),
                          })}
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        {profile ? (
                          <div className="flex space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="flex space-x-2 rounded-sm"
                              onClick={open}>
                              <span>Change</span>
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="flex space-x-2 rounded-sm text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() =>
                                form.resetField("profile_picture", { defaultValue: "" })
                              }>
                              <span>Remove</span>
                            </Button>
                          </div>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="flex space-x-2 self-start rounded-sm"
                            onClick={open}>
                            <Icons.upload size={18} />
                            <span>Upload</span>
                          </Button>
                        )}
                        <ul>{fileRejectionItems}</ul>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-8">
              {/* Basic Info Section */}
              <div className="flex">
                <h2 className="mb-4 ml-8 flex-1 text-lg font-semibold">Basic Info</h2>
                <div className="grid basis-[70%] grid-cols-2 gap-6 sm:grid-cols-2">
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
                    name="date_of_birth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col pt-1">
                        <FormLabel className="min-h-[20px]">DOB</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "h-10 rounded-md text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}>
                                {field.value ? format(field.value, "PPP") : <span>Select DOB</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              captionLayout="dropdown-buttons"
                              mode="single"
                              fromYear={1960}
                              toYear={new Date().getFullYear()}
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <PasswordInput
                              {...field}
                              placeholder="Enter password"
                              value={field.value}
                            />
                            <TooltipProvider delayDuration={0}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span
                                    className="absolute right-9 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                                    onClick={authGeneratePassword}>
                                    <Icons.refresh size={18} />
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>Auto generate password</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </FormControl>
                        {/*   <Checkbox */}
                        {/*     id="auto_password" */}
                        {/*     checked={autoPassword} */}
                        {/*     onCheckedChange={setAutoPassword} */}
                        {/*   /> */}
                        {/*   <label */}
                        {/*     htmlFor="auto_password" */}
                        {/*     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> */}
                        {/*     Auto Password */}
                        {/*   </label> */}
                        {/* </div> */}
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
              <div className="flex">
                <h2 className="mb-4 ml-8 flex-1 text-lg font-semibold">Contact Info</h2>
                <div className="grid basis-[70%] grid-cols-2 gap-6">
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
              <div className="flex">
                <h2 className="mb-4 ml-8 flex-1 text-lg font-semibold">Address</h2>
                <div className="flex basis-[70%] flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="permanent_address"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between">
                          <FormLabel>Permanent Address</FormLabel>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="address"
                              onCheckedChange={() => {
                                const currentAddress = form.getValues("address");
                                if (currentAddress) {
                                  form.setValue("permanent_address", currentAddress);
                                }
                              }}
                            />
                            <label
                              htmlFor="address"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Same as Current Address
                            </label>
                          </div>
                        </div>
                        <FormControl>
                          <Input placeholder="Enter Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Employment Details Section */}
              <div className="flex">
                <h2 className="mb-4 ml-8 flex-1 text-lg font-semibold">Employment Details</h2>
                <div className="grid basis-[70%] grid-cols-2 gap-6">
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
                        <FormControl>
                          <DepartmentSelector
                            defaultValue={field.value}
                            onChange={field.onChange}
                          />
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
                        <FormLabel>Gross monthy Salary</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Gross monthy Salary" {...field} />
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
            <Button type="submit" disabled={isLoading} className="mt-2 self-end">
              {isLoading && <Icons.loader />}
              {!employee ? "Save and Continue" : "Update and Continue"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
