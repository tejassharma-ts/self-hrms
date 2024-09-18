"use client";

import { apiCaller } from "@/lib/auth";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import useEmployeeStore from "@/model/employee";
import { Icons } from "@/components/Icons";

const EmployeeSchema = z.object({
  ctc: z.string(),
  has_hra: z.boolean(),
  has_conveyance: z.boolean(),
  has_allowances: z.boolean(),
  has_special_allowance: z.boolean(),
  has_bonus: z.boolean(),
  has_esi: z.boolean(),
  has_pf: z.boolean(),
});

type Employee = z.infer<typeof EmployeeSchema>;

export default function SalaryDetailsForm() {
  const searchParams = useSearchParams();
  const { employee_id } = useEmployeeStore();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<Employee>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      ctc: "",
      has_hra: false,
      has_conveyance: false,
      has_allowances: false,
      has_special_allowance: false,
      has_bonus: false,
      has_esi: false,
      has_pf: false,
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
        description: "Something went very wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const renderFormField = (name: any, label: any) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {typeof field.value === "boolean" ? (
              <Checkbox
                className="ms-2 size-3"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            ) : (
              <Input {...field} />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );

  return (
    <div className="mt-10">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-8 flex gap-6">
              <h2 className="w-96 text-lg font-semibold">Employee Info</h2>
              <div className="w-full">
                {renderFormField("ctc", "CTC")}
                {renderFormField("has_hra", "HRA")}
                {renderFormField("has_conveyance", "Conveyance")}
                {renderFormField("has_allowances", "Allowances")}
                {renderFormField("has_special_allowance", "Special Allowance")}
                {renderFormField("has_bonus", "Bonus")}
                {renderFormField("has_esi", "ESI")}
                {renderFormField("has_pf", "PF")}
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="mt-2">
                {isLoading && <Icons.loader />}
                ADD Employee Details
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
