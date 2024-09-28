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
import { headers } from "next/headers";

const employeeSchema = z.object({
  bank_name: z.string().min(1, "Bank Name is required").optional(),
  account_holder_name: z.string().min(1, "Account holder name").optional(),
  aadhar_number: z.string().optional(),
  account_number: z.string().min(1, "Account Number is required").optional(),
  pan_number: z.string().min(1, "PAN Number is required").optional(),
  ifsc_code: z.string().min(1, "IFSC Code is required").optional(),
  is_bank_kyc_done: z.boolean().optional(),
  pan_card_image: z.union([z.instanceof(File), z.string()]).optional(),
  aadhaar_card_front_image: z.union([z.instanceof(File), z.string()]).optional(),
  aadhaar_card_back_image: z.union([z.instanceof(File), z.string()]).optional(),
  passbook_back_image: z.union([z.instanceof(File), z.string()]).optional(),
  passbook_port_image: z.union([z.instanceof(File), z.string()]).optional(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

interface AddBankDetailsProps {
  employee_id: string;
  onComplete: () => void;
  employee?: any;
}

const AddBankDetails = ({ employee_id, onComplete, employee }: AddBankDetailsProps) => {
  const [filePreviews, setFilePreviews] = useState<Record<string, string | ArrayBuffer | null>>({});
  const [employeeData, setEmployeeData] = useState<EmployeeFormValues | null>(null);
  const [isBankKycDone, setIsBankKycDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      bank_name: employee?.bank_name || "",
      account_holder_name: employee?.account_holder_name || "",
      aadhar_number: employee?.aadhar_number || "",
      pan_number: employee?.pan_number || "",
      account_number: employee?.account_number || "",
      ifsc_code: employee?.ifsc_code || "",
      is_bank_kyc_done: employee?.is_bank_kyc_done || false,
      pan_card_image: undefined,
      aadhaar_card_front_image: undefined,
      aadhaar_card_back_image: undefined,
      passbook_back_image: undefined,
      passbook_port_image: undefined,
    },
  });

  const handleFileChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreviews((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
      form.setValue(field as keyof EmployeeFormValues, file);
    }
  };

  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("bank_name", data.bank_name || "");
      formData.append("account_holder_name", data.account_holder_name || "");
      formData.append("aadhar_number", data.aadhar_number || "");
      formData.append("pan_number", data.pan_number || "");
      formData.append("account_number", data.account_number || "");
      formData.append("ifsc_code", data.ifsc_code || "");
      formData.append("is_bank_kyc_done", String(data.is_bank_kyc_done));

      if (data.pan_card_image) formData.append("pan_card_image", data.pan_card_image);
      if (data.aadhaar_card_front_image)
        formData.append("aadhaar_card_front_image", data.aadhaar_card_front_image);
      if (data.aadhaar_card_back_image)
        formData.append("aadhaar_card_back_image", data.aadhaar_card_back_image);
      if (data.passbook_back_image)
        formData.append("passbook_back_image", data.passbook_back_image);
      if (data.passbook_port_image)
        formData.append("passbook_port_image", data.passbook_port_image);

      // Sending a PATCH request with the formData
      const response = await apiCaller.patch(
        `api/companies-app/company/add-employee/?employee_id=${employee_id}`,
        formData,
      );

      toast({
        description: "Employee Bank details updated successfully",
      });

      console.log("Employee Bank details updated successfully:", response);
      onComplete();
    } catch (error) {
      toast({
        description: "Something went wrong while updating employee details",
        variant: "destructive",
      });

      console.error("Error updating employee details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormDisabled = isBankKycDone;
  const pan_card_image = "pan_card_image";
  const aadhaar_card_front_image = "aadhaar_card_front_image";
  const aadhaar_card_back_image = "aadhaar_card_back_image";

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-white p-8 shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex">
            <p className="w-40 font-semibold">Bank details</p>
            <div className="mb-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-1">
              <FormField
                control={form.control}
                name="bank_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank name</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank name" {...field} disabled={isFormDisabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="account_holder_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Account holder's name"
                        {...field}
                        disabled={isFormDisabled}
                      />
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
                    <PasswordInput
                      placeholder="Enter Account Number"
                      {...field}
                      disabled={isFormDisabled}
                    />
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
                      <Input placeholder="Enter IFSC Code" {...field} disabled={isFormDisabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex">
            <p className="w-40 font-semibold">Upload Documents</p>
            <div className="mb-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-1">
              <FormField
                control={form.control}
                name="pan_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN Number</FormLabel>
                    <FormControl>
                      <Input placeholder="BKGRY4756t" {...field} disabled={isFormDisabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pan_card_image"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>{field.name.replace(/_/g, " ")}</FormLabel>
                    <FormControl>
                      <div>
                        <div className="flex h-48 w-72 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition hover:border-gray-400">
                          <div className="flex flex-col items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-12 w-12 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 16v-1a4 4 0 014-4h10a4 4 0 014 4v1m-7-4v-8m0 8l-2.29-2.29M12 16l2.29-2.29M12 4v4"
                              />
                            </svg>
                            <Input
                              className="ms-10 cursor-pointer border-none"
                              type="file"
                              onChange={(e) => handleFileChange(pan_card_image, e)}
                              onBlur={field.onBlur}
                              ref={field.ref}
                              disabled={isFormDisabled}
                            />
                          </div>
                        </div>
                        {!filePreviews["pan_card_image"] && employee?.pan_card_image ? (
                          <img
                            src={employee.pan_card_image}
                            alt="Pan Card Image Preview"
                            className="mt-4 h-20 w-20 rounded-lg border border-gray-300 object-cover"
                          />
                        ) : (
                          filePreviews["pan_card_image"] && (
                            <img
                              src={filePreviews["pan_card_image"] as string}
                              alt="Pan Card Image Preview"
                              className="mt-4 h-20 w-20 rounded-lg border border-gray-300 object-cover"
                            />
                          )
                        )}
                      </div>
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
                    <FormLabel>Aadhar Number</FormLabel>
                    <PasswordInput
                      placeholder="**** **** **** ****"
                      {...field}
                      disabled={isFormDisabled}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="aadhaar_card_front_image"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{field.name.replace(/_/g, " ")}</FormLabel>
                      <FormControl>
                        <div>
                          <div className="flex h-48 w-72 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition hover:border-gray-400">
                            <div className="flex flex-col items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 16v-1a4 4 0 014-4h10a4 4 0 014 4v1m-7-4v-8m0 8l-2.29-2.29M12 16l2.29-2.29M12 4v4"
                                />
                              </svg>
                              <Input
                                className="ms-10 cursor-pointer border-none"
                                type="file"
                                onChange={(e) => handleFileChange(aadhaar_card_front_image, e)}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                disabled={isFormDisabled}
                              />{" "}
                            </div>
                          </div>
                          {!filePreviews["aadhaar_card_front_image"] &&
                          employee?.aadhaar_card_front_image ? (
                            <img
                              src={employee.aadhaar_card_front_image}
                              alt="Aadhaar Card Front Image Preview"
                              className="mt-4 h-20 w-20 rounded-lg border border-gray-300 object-cover"
                            />
                          ) : (
                            filePreviews["aadhaar_card_front_image"] && (
                              <img
                                src={filePreviews["aadhaar_card_front_image"] as string}
                                alt="Aadhaar Card Front Image Preview"
                                className="mt-4 h-20 w-20 rounded-lg border border-gray-300 object-cover"
                              />
                            )
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aadhaar_card_back_image"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{field.name.replace(/_/g, " ")}</FormLabel>
                      <FormControl>
                        <div>
                          <div className="flex h-48 w-72 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition hover:border-gray-400">
                            <div className="flex flex-col items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 16v-1a4 4 0 014-4h10a4 4 0 014 4v1m-7-4v-8m0 8l-2.29-2.29M12 16l2.29-2.29M12 4v4"
                                />
                              </svg>
                              <Input
                                className="ms-10 cursor-pointer border-none"
                                type="file"
                                onChange={(e) => handleFileChange(aadhaar_card_back_image, e)}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                disabled={isFormDisabled}
                              />{" "}
                            </div>
                          </div>
                          {!filePreviews["aadhaar_card_back_image"] &&
                          employee?.aadhaar_card_back_image ? (
                            <img
                              src={employee.aadhaar_card_back_image}
                              alt="Aadhaar Card Back Image Preview"
                              className="mt-4 h-20 w-20 rounded-lg border border-gray-300 object-cover"
                            />
                          ) : (
                            filePreviews["aadhaar_card_back_image"] && (
                              <img
                                src={filePreviews["aadhaar_card_back_image"] as string}
                                alt="Aadhaar Card Back Image Preview"
                                className="mt-4 h-20 w-20 rounded-lg border border-gray-300 object-cover"
                              />
                            )
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="mb-5 justify-self-start">
                {isLoading && <Icons.loader />}Save and Continue
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddBankDetails;
