"use client";

import { apiCaller } from "@/lib/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import useEmployeeStore from "@/model/employee";
import { Icons } from "@/components/Icons";

const ComponentSalarySchema = z.object({
  basic_salary: z.string().optional(),
  hra: z.string().optional(),
  allowances: z.string().optional(),
  medical: z.string().optional(),
  lta: z.string().optional(),
  gratuity: z.string().optional(),
  has_lta: z.boolean().optional(),
  has_bonus: z.boolean().optional(),
  has_conveyance: z.boolean().optional(),
  has_hra: z.boolean().optional(),
  has_allowances: z.boolean().optional(),
  has_special_allowance: z.boolean().optional(),
  has_esi: z.boolean().optional(),
  has_pf: z.boolean().optional(),
});

type ComponentSalaryFormValues = z.infer<typeof ComponentSalarySchema>;

const IsComponentBased = ({ salaryStructure = undefined }: { salaryStructure: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { employee_id } = useEmployeeStore();

  const form = useForm<ComponentSalaryFormValues>({
    resolver: zodResolver(ComponentSalarySchema),
    defaultValues: {
      basic_salary: salaryStructure?.basic_salary || "",
      hra: salaryStructure?.hra || "",
      allowances: salaryStructure?.allowances || "",
      medical: salaryStructure?.medical || "",
      lta: salaryStructure?.lta || "",
      gratuity: salaryStructure?.gratuity || "",
      has_bonus: salaryStructure?.has_bonus || false,
      has_conveyance: salaryStructure?.has_conveyance || false,
      has_hra: salaryStructure?.has_hra || false,
      has_allowances: salaryStructure?.has_allowances || false,
      has_special_allowance: salaryStructure?.has_special_allowance || false,
      has_esi: salaryStructure?.has_esi || false,
      has_pf: salaryStructure?.has_pf || false,
    },
  });

  async function onSubmit(data: ComponentSalaryFormValues) {
    try {
      setIsLoading(true);

      const requestBody = {
        employee: employee_id,
        is_component_based: true,
        basic_salary: data.basic_salary,
        hra: data.hra || "0",
        allowances: data.hra || "0",
        medical: data.medical,
        lta: data.lta,
        gratuity: data.gratuity || "0",
        has_bonus: data.has_bonus,
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
    { name: "has_allowances", label: "Allowances" },
    { name: "has_conveyance", label: "Conveyance" },
    { name: "has_bonus", label: "Bonus" },
    { name: "has_special_allowance", label: "Special Allowance" },
    { name: "has_esi", label: "ESI" },
    { name: "has_pf", label: "PF" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="basic_salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Basic Salary</FormLabel>
                <FormControl>
                  <Input placeholder="Enter basic salary" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hra"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HRA</FormLabel>
                <FormControl>
                  <Input placeholder="Enter HRA" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowances"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allowance</FormLabel>
                <FormControl>
                  <Input placeholder="Enter  allowance" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="medical"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medical insurance</FormLabel>
                <FormControl>
                  <Input placeholder="Enter medical insurance" {...field} />
                </FormControl>
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
  );
};
export default IsComponentBased;