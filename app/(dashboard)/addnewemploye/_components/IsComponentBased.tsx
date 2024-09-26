"use client";

import { apiCaller } from "@/lib/auth";
import React, { useState } from "react";
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

const ComponentSalarySchema = z.object({
  basic_salary: z.string().optional(),
  hra: z.string().optional(),
  allowances: z.string().optional(),
  medical: z.string().optional(),
  lta: z.string().optional(),
  gratuity: z.string().optional(),
  has_bonus: z.boolean().optional(),
  has_conveyance: z.boolean().optional(),
  has_hra: z.boolean().optional(),
  has_allowances: z.boolean().optional(),
  has_special_allowance: z.boolean().optional(),
  has_esi: z.boolean().optional(),
  has_pf: z.boolean().optional(),
});

type ComponentSalaryFormValues = z.infer<typeof ComponentSalarySchema>;

const IsComponentBased = ({ salaryStructure }: { salaryStructure: any }) => {
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
                <FormLabel>Medical</FormLabel>
                <FormControl>
                  <Input placeholder="Enter medical" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lta"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LTA</FormLabel>
                <FormControl>
                  <Input placeholder="Enter lta" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4 mt-5 flex flex-col">
          <FormField
            control={form.control}
            name="has_hra"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    id="has_hra"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="has_hra">HRA</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="has_allowances"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    id="has_allowances"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="has_allowances">Allowances</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="has_conveyance"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    id="has_conveyance"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="has_conveyance">Conveyance</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="has_bonus"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    id="has_bonus"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="has_bonus">Bonus</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="has_special_allowance"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    id="has_special_allowance"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="has_special_allowance">Special Allowance</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="has_esi"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    id="has_esi"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="has_esi">ESI</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="has_pf"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    id="has_pf"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="">pf</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="mt-4" disabled={isLoading}>
            {isLoading && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Saving..." : "Add Salary Details"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default IsComponentBased;
