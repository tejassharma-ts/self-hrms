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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import useEmployeeStore from "@/model/employee";
import { Icons } from "@/components/Icons";
import { useAddEmployeeStore } from "@/model/add-employee";
import { redirect, useRouter } from "next/navigation";

const GrossSalarySchema = z.object({
  gross_salary: z.string().optional(),
  medical_insurance: z.string().optional(),
  conveyance: z.string().optional(),
  // gratuity: z.string().optional(),
  has_medical_allowance: z.boolean().optional(),
  has_bonus: z.boolean().optional(),
  has_conveyance: z.boolean().optional(),
  has_lta: z.boolean().optional(),
  has_hra: z.boolean().optional(),
  has_allowances: z.boolean().optional(),
  has_special_allowance: z.boolean().optional(),
  has_esi: z.boolean().optional(),
  has_pf: z.boolean().optional(),
});

type GrossSalaryFormValues = z.infer<typeof GrossSalarySchema>;

type IsGrossBasedProps = {
  salaryStructure: any;
  employeeID?: string;
};
export default function IsGrossBased({ salaryStructure, employeeID }: IsGrossBasedProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { form: formStore } = useAddEmployeeStore();

  const form = useForm<GrossSalaryFormValues>({
    resolver: zodResolver(GrossSalarySchema),
    defaultValues: {
      gross_salary: salaryStructure?.gross_monthly_salary || "",
      medical_insurance: salaryStructure?.medical_insurance || "",
      // gratuity: salaryStructure?.gratuity || "",
      has_medical_allowance: salaryStructure?.has_medical_allowance || "",
      has_bonus: salaryStructure?.has_bonus || false,
      has_conveyance: salaryStructure?.has_conveyance || false,
      has_hra: salaryStructure?.has_hra || false,
      has_allowances: salaryStructure?.has_allowances || false,
      has_special_allowance: salaryStructure?.has_special_allowance || false,
      has_esi: salaryStructure?.has_esi || false,
      has_pf: salaryStructure?.has_pf || false,
      has_lta: salaryStructure?.has_lta || false,
    },
  });

  useEffect(() => {
    if (formStore.personal) {
      form.setValue("gross_salary", formStore.personal.salary);
    }
  }, [formStore]);

  async function onSubmit(data: GrossSalaryFormValues) {
    try {
      setIsLoading(true);

      const requestBody = {
        // gratuity: data.gratuity || "0",
        is_gross_based: true,
        conveyance: data.conveyance,
        employee: employeeID,
        gross_salary: data.gross_salary,
        medical_insurance: data.medical_insurance,
        has_bonus: data.has_bonus,
        has_medical_allowance: data.has_medical_allowance,
        has_conveyance: !!data.conveyance,
        has_hra: data.has_hra,
        has_allowances: data.has_allowances,
        has_special_allowance: data.has_special_allowance,
        has_esi: data.has_esi,
        has_pf: data.has_pf,
        has_lta: data.has_lta,
      };

      await apiCaller.post("/api/payroll_app/salary-structures/", requestBody);
      toast({
        description: "Salary successfully added",
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

  const fields: Array<{ name: keyof GrossSalaryFormValues; label: string }> = [
    { name: "has_medical_allowance", label: "Medical Insurance" },
    { name: "has_hra", label: "HRA" },
    { name: "has_lta", label: "LTA" },
    { name: "has_allowances", label: "Allowances" },
    { name: "has_bonus", label: "Bonus" },
    { name: "has_special_allowance", label: "Other Allowance" },
    { name: "has_esi", label: "ESI" },
    { name: "has_pf", label: "PF" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="medical_insurance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medical Insurance</FormLabel>
                <FormControl>
                  <Input placeholder="Enter medical insurance" {...field} />
                </FormControl>
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
              </FormItem>
            )}
          />
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
  );
}
