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
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/app/(auth)/auth/_components/PasswordInput";
import { apiCaller } from "@/lib/auth";
import { Icons } from "@/components/Icons";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import { isString, isValidUrl } from "@/lib/string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAddEmployeeStore } from "@/model/add-employee";
import { formatAdharNumber } from "@/lib/utils";
import AppError from "@/lib/error";

const employeeSchema = z.object({
  bank_name: z
    .string()
    .min(3, "Bank name must be at least 3 characters long.")
    .max(100, "Bank name cannot exceed 100 characters."),
  account_holder_name: z
    .string()
    .min(1, "Account holder name is required")
    .max(30, "Account holder name cannot exceed 30 characters.")
    .regex(/^[a-zA-Z\s]+$/, "Account holder name must contain only alphabets"),
  aadhar_number: z
    .string()
    .min(14, "Aadhar number must be exactly 12 digits")
    .max(14, "Aadhar number must be exactly 12 digits"),
  account_number: z
    .string()
    .min(1, "Account Number is required")
    .regex(/^\d{9,18}$/, "Account number must be between 9 and 18 digits"),
  pan_number: z
    .string()
    .min(1, "PAN Number is required")
    .regex(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "PAN Number must be in the correct format (e.g., ABCDE1234F)",
    )
    .optional(),
  ifsc_code: z
    .string()
    .min(1, "IFSC Code is required")
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "IFSC Code must be in the correct format (e.g., ABCD0123456)"),
  aadhaar_card_front_image: z.union([z.instanceof(File), z.string()]).optional(),
  aadhaar_card_back_image: z.union([z.instanceof(File), z.string()]).optional(),
  passbook_image: z.union([z.instanceof(File), z.string()]).optional(),
  passport_image: z.union([z.instanceof(File), z.string()]).optional(),
  pan_card_image: z.union([z.instanceof(File), z.string()]).optional(),

  is_bank_kyc_done: z.boolean().optional(),

  // uan: z.string().max(25, "Gender description cannot exceed 25 characters").optional(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="mb-3 h-8 w-8 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
    </>
  );
};

type DropzoneProps = {
  onChange: (file: File) => void;
};
function Dropzone({ onChange }: DropzoneProps) {
  const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
    accept: {
      "image/*": [],
    },
    noClick: true,
    noKeyboard: true,
    maxSize: 2 * (1024 * 1024),
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length) return;
      const file = acceptedFiles[0];
      onChange(file);
    },
    maxFiles: 1,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.path} className="mt-2 text-sm font-medium text-destructive">
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </div>
  ));

  return (
    <div
      {...getRootProps()}
      className="relative flex max-w-sm cursor-pointer flex-col items-center border border-dashed border-black px-4 py-8">
      <FileSvgDraw />
      <input {...getInputProps()} />
      <div className="absolute inset-0" onClick={open} />
      {fileRejectionItems}
    </div>
  );
}

type AddBankDetailsProps = {
  employee?: any;
};

export default function AddBankDetails({ employee }: AddBankDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { setEmployeeField, form: storedForm } = useAddEmployeeStore();
  useEffect(() => {
    if (!employee) return;
    setEmployeeField("personal", employee);
  }, [employee]);

  const form = useForm<EmployeeFormValues>({
    mode: "onChange",
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      bank_name: employee?.bank_name || "",
      account_holder_name: employee?.account_holder_name || "",
      aadhar_number: formatAdharNumber(employee?.aadhar_number || "") || "",
      pan_number: employee?.pan_number || "",
      account_number: employee?.account_number || "",
      ifsc_code: employee?.ifsc_code || "",
      is_bank_kyc_done: employee?.is_bank_kyc_done || false,
      pan_card_image: employee?.pan_card_image || "",
      aadhaar_card_front_image: employee?.aadhaar_card_front_image || "",
      aadhaar_card_back_image: employee?.aadhaar_card_back_image || "",
      passbook_image: employee?.passbook_image || "",
      passport_image: employee?.passport_image || "",
    },
  });

  async function onSubmit(data: EmployeeFormValues) {
    try {
      data.aadhar_number = data.aadhar_number.replaceAll(" ", "");

      setIsLoading(true);
      const formData = new FormData();

      if (employee) {
        // we are updating fields
        Object.keys(employee).map((key) => {
          // @ts-ignore
          if (data.hasOwnProperty(key) && employee[key] !== data[key]) {
            // for image because only expiry time updates IDK why but, additional check will do the job for now
            // if it is a valid url we can safely return without appending because if the assest has  really changed
            // it would be having blob object
            //
            // @ts-ignore if (isValidUrl(data[key])) return;
            // @ts-ignore
            formData.append(key, data[key]);
          }
        });
      } else {
        Object.keys(data).forEach((key) => {
          // @ts-ignore
          formData.append(key, data[key]);
        });
      }

      await apiCaller.patch(
        `api/companies-app/company/add-employee/?employee_id=${employee.id}`,
        formData,
      );

      toast({
        description: "Employee Bank details updated successfully",
      });

      // showing a check in bank details form
      setEmployeeField("personal", { ...storedForm, bank_name: "temp" });

      const params = new URLSearchParams(searchParams);
      params.set("active_form", "salary-structure");
      router.push(`${pathname}?${params.toString()}`);
    } catch (error) {
      const customError = new AppError(error);
      toast({
        description: customError.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function renderThumb({ file, onRemove }: { file: File | string; onRemove: () => void }) {
    if (!file) return;
    return (
      <div className="group relative flex size-24 overflow-hidden rounded-md">
        <Icons.trash
          size={15}
          className="absolute right-1 top-1 z-50 cursor-pointer stroke-white stroke-2 opacity-0 transition-opacity hover:stroke-destructive group-hover:opacity-100"
          onClick={onRemove}
        />
        <img
          // @ts-ignore
          src={isString(file) ? file : file.preview}
          className="h-full w-full object-cover"
          onLoad={() => {
            if (isString(file)) return;
            // @ts-ignore
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    );
  }

  return (
    <Card className="rounded-md">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex">
              <p className="ml-8 flex-1 font-semibold">Bank details</p>
              <div className="mb-8 grid w-full basis-[70%] grid-cols-1 gap-6 sm:grid-cols-1">
                <FormField
                  control={form.control}
                  name="account_holder_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Holder's name</FormLabel>
                      <FormControl>
                        <Input placeholder="Account holder's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bank_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank name</FormLabel>
                      <FormControl>
                        <Input placeholder="Bank name" {...field} />
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
                      <PasswordInput placeholder="Enter Account Number" {...field} />
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

            <div className="flex">
              <p className="ml-8 flex-1 font-semibold">Upload Documents</p>
              <div className="mb-8 grid w-full basis-[70%] grid-cols-1 gap-6 sm:grid-cols-1">
                <FormField
                  control={form.control}
                  name="pan_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PAN Number</FormLabel>
                      <FormControl>
                        <Input placeholder="BKGRY4756t" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pan_card_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload PAN</FormLabel>
                      <FormControl>
                        <>
                          <Dropzone
                            onChange={(file: File) => {
                              const fileWithPreview = Object.assign(file, {
                                preview: URL.createObjectURL(file),
                              });
                              field.onChange(fileWithPreview);
                            }}
                          />
                          {renderThumb({
                            // @ts-ignore
                            file: form.getValues("pan_card_image"),
                            onRemove: () => form.resetField("pan_card_image", { defaultValue: "" }),
                          })}
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aadhar_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhar</FormLabel>
                      <PasswordInput
                        show
                        placeholder="Enter Aadhar number"
                        maxLength={14}
                        {...field}
                        onChange={(e) => {
                          let { value } = e.target;

                          value = value.replace(/\D/g, "");

                          const formattedValue = value.match(/.{1,4}/g)?.join(" ") || "";
                          field.onChange(formattedValue);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="aadhaar_card_front_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Aadhar (Front)</FormLabel>
                        <FormControl>
                          <>
                            <Dropzone
                              onChange={(file: File) => {
                                const fileWithPreview = Object.assign(file, {
                                  preview: URL.createObjectURL(file),
                                });
                                field.onChange(fileWithPreview);
                              }}
                            />
                            {renderThumb({
                              // @ts-ignore
                              file: form.getValues("aadhaar_card_front_image"),
                              onRemove: () =>
                                form.resetField("aadhaar_card_front_image", { defaultValue: "" }),
                            })}
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="aadhaar_card_back_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Aadhar (Back)</FormLabel>
                        <FormControl>
                          <>
                            <Dropzone
                              onChange={(file: File) => {
                                const fileWithPreview = Object.assign(file, {
                                  preview: URL.createObjectURL(file),
                                });
                                field.onChange(fileWithPreview);
                              }}
                            />
                            {renderThumb({
                              // @ts-ignore
                              file: form.getValues("aadhaar_card_back_image"),
                              onRemove: () =>
                                form.resetField("aadhaar_card_back_image", { defaultValue: "" }),
                            })}
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passport_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passport</FormLabel>
                        <FormControl>
                          <>
                            <Dropzone
                              onChange={(file: File) => {
                                const fileWithPreview = Object.assign(file, {
                                  preview: URL.createObjectURL(file),
                                });
                                field.onChange(fileWithPreview);
                              }}
                            />
                            {renderThumb({
                              // @ts-ignore
                              file: form.getValues("passport_image"),
                              onRemove: () =>
                                form.resetField("passport_image", { defaultValue: "" }),
                            })}
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passbook_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passbook</FormLabel>
                        <FormControl>
                          <>
                            <Dropzone
                              onChange={(file: File) => {
                                const fileWithPreview = Object.assign(file, {
                                  preview: URL.createObjectURL(file),
                                });
                                field.onChange(fileWithPreview);
                              }}
                            />
                            {renderThumb({
                              // @ts-ignore
                              file: form.getValues("passbook_image"),
                              onRemove: () =>
                                form.resetField("passbook_image", { defaultValue: "" }),
                            })}
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="self-end">
              {isLoading && <Icons.loader />}Save and Continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
