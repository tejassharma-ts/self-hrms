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
import { Icons } from "@/components/Icons";
import useEmployeeStore from "@/model/employee";

const EmployeeSchema = z.object({
  basic: z.string(),
  hra: z.boolean(),
  conveyance: z.string(),
  allowance: z.string(),
  special_allowance: z.string(),
  pf: z.string(),
  lta: z.string(),
  medical: z.string(),
  employee_esi: z.string(),
  employer_esi: z.string(),
  gratuity: z.string(),
});

type Employee = z.infer<typeof EmployeeSchema>;

export default function SalaryDetailsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { employee_id } = useEmployeeStore();

  const form = useForm<Employee>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      basic: "",
      hra: false,
      conveyance: "",
      allowance: "",
      special_allowance: "",
      pf: "",
      lta: "",
      medical: "",
      employee_esi: "",
      employer_esi: "",
      gratuity: "",
    },
  });

  async function onSubmit(data: Employee) {
    try {
      setIsLoading(true);
      await apiCaller.post("/api/payroll_app/salary-structures/", {
        ...data,
        employee: employee_id,
      });
      toast({
        description: "Salary successfully added",
      });
    } catch (err) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-10">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Basic */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="basic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Basic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Basic salary amount" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* HRA */}
            <div className="mb-4 flex items-center">
              <FormField
                control={form.control}
                name="hra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mr-2">HRA</FormLabel>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Input placeholder="Enter HRA amount" className="ml-4" />
            </div>

            {/* Conveyance */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="conveyance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conveyance</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Conveyance amount " {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Allowance */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="allowance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allowance</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Allowance amount" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Special Allowance */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="special_allowance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Allowance</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Special Allowance amount" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* PF */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="pf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PF</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter PF amount" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* LTA */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="lta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LTA</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter LTA amount" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Medical */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="medical"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Medical amount" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Employer ESI */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="employer_esi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer Contribution ESI</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Employer Contribution ESI amount" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Gratuity */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="gratuity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gratuity</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Gratuity amount " {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Total CTC */}
            <div className="mt-8 rounded-md bg-gray-100 p-4">
              <div className="text-lg font-bold">
                Total CTC: <span>Rs :</span>
              </div>
              <div className="text-sm"></div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.loader />}
                Add Employee
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
