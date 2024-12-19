"use client";

import { apiCaller } from "@/lib/auth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import useEmployeeStore from "@/model/employee";
import { Icons } from "@/components/Icons";
import { useAddEmployeeStore } from "@/model/add-employee";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useAuthStore from "@/model/auth";
import { useClientAuth } from "@/context/auth-context";
import { setDefaultOptions } from "date-fns";
import { CompanyAccount } from "@/types/auth";

const ComponentSalarySchema = z.object({
  gross_salary: z
    .string()
    .refine(
      (val) => {
        const parsed = parseFloat(val);
        return !isNaN(parsed) && parsed > 0 && parsed <= 99999999.99;
      },
      {
        message: "Basic salary must be a positive number not exceeding 99,999,999.99.",
      },
    )
    .optional(),
  // hra: z
  //   .string()
  //   .refine(
  //     (val) => {
  //       const parsed = parseFloat(val);
  //       return !isNaN(parsed) && parsed > 0 && parsed <= 99999999.99;
  //     },
  //     {
  //       message: "HRA must be a positive number not exceeding 99,999,999.99.",
  //     },
  //   )
  //   .optional(),
  allowances: z.string().optional(),
  medical: z
    .string()
    .refine(
      (val) => {
        const parsed = parseFloat(val);
        return !isNaN(parsed) && parsed >= 0 && parsed <= 99999999.99;
      },
      {
        message: "Medical Insurance must be a positive number not exceeding 99,999,999.99.",
      },
    )
    .optional(),
  conveyance: z
    .string()
    .refine(
      (val) => {
        const parsed = parseFloat(val);
        return !isNaN(parsed) && parsed >= 0 && parsed <= 99999999.99;
      },
      {
        message: "Conveyance must be a positive number not exceeding 99,999,999.99.",
      },
    )
    .optional(),
  gratuity: z.string().optional(),
  has_lta: z.boolean().optional(),
  has_bonus: z.boolean().optional(),
  has_conveyance: z.boolean().optional(),
  has_hra: z.boolean().optional(),
  has_allowances: z.boolean().optional(),
  has_special_allowance: z.boolean().optional(),
  has_esi: z.boolean().optional(),
  has_pf: z.boolean().optional(),
  has_medical_allowance: z.boolean().optional(),
  has_lwf: z.boolean().optional(),
});

type ComponentSalaryFormValues = z.infer<typeof ComponentSalarySchema>;

type CompanyDetails = {
  id: string;
  company_name: string;
  address: string;
  created_at: string; // ISO date string
  company_website_url: string;
  esi_rate: string;
  employer_contribution_esi_rate: string;
  pf_rate: string;
  bonus_percentage: string;
  conveyance_percentage: string;
  hra_percentage: string;
  basic_salary_percentage: string;
  allowance_percentage: string;
  days_in_month: number;
  working_days: string; // Consider converting to number if appropriate
  yearly_working_days: string; // Consider converting to number if appropriate
  no_of_employee_working: string; // Consider converting to number if appropriate
  industry: string;
  company_logo: string;
  lat: string; // Consider converting to number if appropriate
  long: string; // Consider converting to number if appropriate
  location: string;
  total_casual_leaves: number;
  total_sick_leaves: number;
  leave_carry_forward_policy: string;
  owner: string;
};

const isGrossBased = ({
  salaryStructure = undefined,
  employeeID,
}: {
  salaryStructure: any;
  employeeID?: any;
}) => {
  const [defaultSettings, setDefaultSettings] = useState<CompanyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { form: formStore } = useAddEmployeeStore();
  const router = useRouter();

  const { token } = useClientAuth();

  useEffect(() => {
    async function getDefaultCompanySettings() {
      try {
        const res = await apiCaller.get("/api/companies-app/company/profile/");
        setDefaultSettings(res.data);
      } catch (err) {}
    }

    if (token) {
      getDefaultCompanySettings();
    }
  }, [token]);

  const form = useForm<ComponentSalaryFormValues>({
    resolver: zodResolver(ComponentSalarySchema),
    mode: "onChange",
    defaultValues: {
      gross_salary: salaryStructure?.gross_monthly_salary || "",
      // hra: salaryStructure?.hra || "",
      allowances: salaryStructure?.allowances || "",
      medical: salaryStructure?.medical_insurance || "",
      has_medical_allowance: salaryStructure?.has_medical_allowance || "",
      conveyance: salaryStructure?.conveyance || "",
      gratuity: salaryStructure?.gratuity || "",
      has_lta: salaryStructure?.has_lta || false,
      has_bonus: salaryStructure?.has_bonus || false,
      has_conveyance: salaryStructure?.has_conveyance || false,
      has_hra: salaryStructure?.has_hra || false,
      has_special_allowance: salaryStructure?.has_special_allowance || false,
      has_esi: salaryStructure?.has_esi || false,
      has_pf: salaryStructure?.has_pf || false,
      has_lwf: salaryStructure?.has_lwf || false,
    },
  });

  useEffect(() => {
    if (formStore.personal) {
      form.setValue("gross_salary", formStore.personal.salary);
    }
  }, [formStore]);

  async function onSubmit(data: ComponentSalaryFormValues) {
    try {
      setIsLoading(true);

      const requestBody = {
        employee: employeeID,
        is_component_based: false,
        is_gross_based: true,
        gross_salary: data.gross_salary,
        // hra: data.hra || "0",
        conveyance: data.conveyance,
        allowances: 0,
        medical_insurance: data.medical,
        gratuity: data.gratuity || "0",
        has_lta: data.has_lta,
        has_bonus: data.has_bonus,
        has_medical_allowance: data.has_medical_allowance,
        has_conveyance: data.has_conveyance,
        has_hra: data.has_hra,
        has_allowances: data.has_allowances,
        has_special_allowance: data.has_special_allowance,
        has_esi: data.has_esi,
        has_pf: data.has_pf,
        has_lwf: data.has_lwf,
      };

      await apiCaller.post("/api/payroll_app/salary-structures/", requestBody);
      toast({
        description: "Gross based salary successfully added",
      });
      router.refresh();
    } catch (err) {
      console.error(err);
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const conveyanceChecked = form.watch("conveyance");
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="gross_salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gross Salary</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter gross salary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField */}
            {/*   control={form.control} */}
            {/*   name="hra" */}
            {/*   render={({ field }) => ( */}
            {/*     <FormItem> */}
            {/*       <FormLabel>HRA</FormLabel> */}
            {/*       <FormControl> */}
            {/*         <Input placeholder="Enter HRA" {...field} /> */}
            {/*       </FormControl> */}
            {/*     </FormItem> */}
            {/*   )} */}
            {/* /> */}
            {/* <FormField */}
            {/*   control={form.control} */}
            {/*   name="allowances" */}
            {/*   render={({ field }) => ( */}
            {/*     <FormItem> */}
            {/*       <FormLabel>Allowance</FormLabel> */}
            {/*       <FormControl> */}
            {/*         <Input placeholder="Enter  allowance" {...field} /> */}
            {/*       </FormControl> */}
            {/*     </FormItem> */}
            {/*   )} */}
            {/* /> */}
            <FormField
              control={form.control}
              name="medical"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical insurance</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter medical insurance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="conveyance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conveyance</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter conveyance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField */}
            {/*   control={form.control} */}
            {/*   name="lta" */}
            {/*   render={({ field }) => ( */}
            {/*     <FormItem> */}
            {/*       <FormLabel>LTA</FormLabel> */}
            {/*       <FormControl> */}
            {/*         <Input placeholder="Enter lta" {...field} /> */}
            {/*       </FormControl> */}
            {/*     </FormItem> */}
            {/*   )} */}
            {/* /> */}
          </div>

          <div className="flex flex-col">
            <h1 className="my-8 font-medium">Select the modules you would like to enable.</h1>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2">
                <div className="flex flex-col space-y-4">
                  <h1 className="font-semibold italic">Earrings</h1>
                  {salaryStructure ? <h1 className="font-medium">Basic Salary</h1> : null}
                  <FormField
                    control={form.control}
                    name="has_hra"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              id="has_hra"
                            />
                          </FormControl>
                          <FormLabel htmlFor="has_hra" className="text-base">
                            HRA (
                            {defaultSettings?.hra_percentage
                              ? parseFloat(defaultSettings?.hra_percentage) + "%"
                              : null}
                            )
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="has_conveyance"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={!!conveyanceChecked || !!field.value}
                              onCheckedChange={field.onChange}
                              id="has_conveyance"
                            />
                          </FormControl>
                          <FormLabel htmlFor="has_conveyance" className="text-base">
                            Conveyance (
                            {defaultSettings?.conveyance_percentage
                              ? parseFloat(defaultSettings?.conveyance_percentage) + "%"
                              : null}
                            )
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="has_special_allowance"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              id="has_special_allowance"
                            />
                          </FormControl>
                          <FormLabel htmlFor="has_special_allowance" className="text-base">
                            Other Allowance (
                            {defaultSettings?.other_allowance
                              ? parseFloat(defaultSettings?.conveyance_percentage) + "%"
                              : null}
                            )
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="has_medical_allowance"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              id="has_medical_allowance"
                            />
                          </FormControl>
                          <FormLabel htmlFor="has_medical_allowance" className="text-base">
                            Medical Allowance (
                            {defaultSettings?.med_allowance
                              ? parseFloat(defaultSettings?.hra_percentage) + "%"
                              : null}
                            )
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-10 flex flex-col space-y-4">
                  {salaryStructure ? <h1>{formatCurrency(salaryStructure.basic_salary)}</h1> : null}
                  <h1>{formatCurrency(salaryStructure?.hra) || "-"}</h1>
                  <h1>{formatCurrency(salaryStructure?.conveyance) || "-"}</h1>
                  <h1>{formatCurrency(salaryStructure?.special_allowance) || "-"}</h1>
                  <h1>{formatCurrency(salaryStructure?.med_allowance) || "-"}</h1>
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="flex flex-col space-y-4">
                  <h1 className="font-semibold italic">Statutory Benefits</h1>
                  <FormField
                    control={form.control}
                    name="has_pf"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              id="has_pf"
                            />
                          </FormControl>
                          <FormLabel htmlFor="has_pf" className="text-base">
                            Provident Fund (PF) (
                            {defaultSettings?.pf_rate
                              ? parseFloat(defaultSettings?.pf_rate) + "%"
                              : null}
                            )
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="has_esi"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              id="has_esi"
                            />
                          </FormControl>
                          <FormLabel htmlFor="has_esi" className="text-base">
                            Employee State Insurance (ESIC) (
                            {defaultSettings?.esi_rate
                              ? parseFloat(defaultSettings?.esi_rate) + "%"
                              : null}
                            )
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-10 flex flex-col space-y-4">
                  <h1>{formatCurrency(salaryStructure?.employee_contribution_pf) || "-"}</h1>
                  <h1>{formatCurrency(salaryStructure?.employee_contribution_esi) || "-"}</h1>
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="flex flex-col space-y-4">
                  <h1 className="font-semibold italic">Other Benefits</h1>
                  <FormField
                    control={form.control}
                    name="has_lta"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              id="has_lta"
                            />
                          </FormControl>
                          <FormLabel htmlFor="has_lta" className="text-base">
                            LTA (
                            {defaultSettings?.lta_rate
                              ? parseFloat(defaultSettings?.esi_rate) + "%"
                              : null}
                            )
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="has_lwf"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              id="has_lwf"
                            />
                          </FormControl>
                          <FormLabel htmlFor="has_lwf" className="text-base">
                            LWF
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="has_bonus"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              id="has_bonus"
                            />
                          </FormControl>
                          <FormLabel htmlFor="has_bonus" className="text-base">
                            Bonus
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-10 flex flex-col space-y-4">
                  <h1>{formatCurrency(salaryStructure?.lta) || "-"}</h1>
                  <h1>{formatCurrency(salaryStructure?.lwf) || "-"}</h1>
                  <h1>{formatCurrency(salaryStructure?.bonuses) || "-"}</h1>
                </div>
              </div>
            </div>
          </div>
          {!salaryStructure ? (
            <div className="flex justify-center">
              <Button type="submit" className="mt-4" disabled={isLoading}>
                {isLoading && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Saving..." : "Add Salary Details"}
              </Button>
            </div>
          ) : null}
        </form>
      </Form>
    </>
  );
};
export default isGrossBased;
