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

const ComponentSalarySchema = z.object({
  basic_salary: z
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
        return !isNaN(parsed) && parsed > 0 && parsed <= 99999999.99;
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
        return !isNaN(parsed) && parsed > 0 && parsed <= 99999999.99;
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
});

type ComponentSalaryFormValues = z.infer<typeof ComponentSalarySchema>;

const IsComponentBased = ({
  salaryStructure = undefined,
  employeeID,
}: {
  salaryStructure: any;
  employeeID?: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { form: formStore } = useAddEmployeeStore();

  const form = useForm<ComponentSalaryFormValues>({
    resolver: zodResolver(ComponentSalarySchema),
    mode: "onChange",
    defaultValues: {
      basic_salary: salaryStructure?.basic_salary || "",
      // hra: salaryStructure?.hra || "",
      allowances: salaryStructure?.allowances || "",
      medical: salaryStructure?.medical_insurance || "",
      has_medical_allowance: salaryStructure?.has_medical_allowance || false,
      conveyance: salaryStructure?.conveyance || "",
      gratuity: salaryStructure?.gratuity || "",
      has_lta: salaryStructure?.has_lta || false,
      has_bonus: salaryStructure?.has_bonus || false,
      has_conveyance: salaryStructure?.has_conveyance || false,
      has_hra: salaryStructure?.has_hra || false,
      has_allowances: salaryStructure?.has_allowances || false,
      has_special_allowance: salaryStructure?.has_special_allowance || false,
      has_esi: salaryStructure?.has_esi || false,
      has_pf: salaryStructure?.has_pf || false,
    },
  });

  useEffect(() => {
    if (formStore.personal) {
      form.setValue("basic_salary", formStore.personal.salary);
    }
  }, [formStore]);

  async function onSubmit(data: ComponentSalaryFormValues) {
    try {
      setIsLoading(true);

      const requestBody = {
        employee: employeeID,
        is_component_based: false,
        is_gross_based: true,
        gross_salary: data.basic_salary,
        // hra: data.hra || "0",
        conveyance: data.conveyance,
        allowances: data.hra || "0",
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
      };

      await apiCaller.post("/api/payroll_app/salary-structures/", requestBody);
      toast({
        description: "Component-based salary successfully added",
      });
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

  const fields: Array<{ name: keyof ComponentSalaryFormValues; label: string }> = [
    { name: "has_hra", label: "HRA" },
    { name: "has_lta", label: "LTA" },
    // { name: "has_allowances", label: "Allowances" },
    { name: "has_medical_allowance", label: "Medical Allowances" },
    { name: "has_conveyance", label: "Conveyance" },
    { name: "has_bonus", label: "Bonus" },
    { name: "has_special_allowance", label: "Other Allowance" },
    { name: "has_esi", label: "ESIC" },
    { name: "has_pf", label: "PF" },
  ];

  return (
    <>
      <DefaultSetting />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="basic_salary"
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
              {fields.map(({ name, label }) => (
                <div className="">
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              id={name}
                            />
                          </FormControl>
                          <FormLabel htmlFor={name} className="text-base">
                            {label}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
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
export default IsComponentBased;

const CompanyDefaults = z.object({
  basic_salary_percentage: z
    .string()
    .refine(
      (val) => {
        const parsed = parseFloat(val);
        return !isNaN(parsed) && parsed >= 0 && parsed <= 100;
      },
      {
        message: "Basic salary percentage must be a number between 0 and 100.",
      },
    )
    .optional(),
  hra_percentage: z
    .string()
    .refine(
      (val) => {
        const parsed = parseFloat(val);
        return !isNaN(parsed) && parsed >= 0 && parsed <= 100;
      },
      {
        message: "HRA percentage must be a number between 0 and 100.",
      },
    )
    .optional(),
  allowance_percentage: z
    .string()
    .refine(
      (val) => {
        const parsed = parseFloat(val);
        return !isNaN(parsed) && parsed >= 0 && parsed <= 100;
      },
      {
        message: "Allowance percentage must be a number between 0 and 100.",
      },
    )
    .optional(),
});

type CompanyDefaultsValues = z.infer<typeof CompanyDefaults>;

function DefaultSetting() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CompanyDefaultsValues>({
    resolver: zodResolver(CompanyDefaults),
    mode: "onChange",
    defaultValues: {
      basic_salary_percentage: "20", // 50
      hra_percentage: "20", // 30
      allowance_percentage: "60", // 30
    },
  });

  useEffect(() => {
    async function getCompanyProfile() {
      try {
        const res = await apiCaller.get("/api/companies-app/company/profile/");
        form.setValue("basic_salary_percentage", res.data.basic_salary_percentage);
        form.setValue("hra_percentage", res.data.hra_percentage);
        form.setValue("allowance_percentage", res.data.allowance_percentage);
      } catch (err) {
        console.log(err);
      }
    }

    getCompanyProfile();
  }, []);

  async function onSubmit(data: CompanyDefaultsValues) {
    try {
      setIsLoading(true);
      const res = await apiCaller.patch("/api/companies-app/company/profile/", data);
      console.log(res);
      toast({
        description: "Company default has been updated",
      });
    } catch (err) {
      console.log(err);
      toast({
        description: "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="basic_salary_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Basis Salary Percentage</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter basic salary percentage" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hra_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HRA</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter HRA percentage" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowance_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allowance</FormLabel>
                <FormControl>
                  <Input placeholder="Enter allowance percentage" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button disabled={isLoading}>
            {isLoading ? <Icons.loader className="ml-2" /> : null}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
