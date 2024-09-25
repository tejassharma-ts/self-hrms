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
import { fromJSON } from "postcss";

// Validation schema

const EmployeeSchema = z.object({
    hra: z.string(),
    allowances: z.string(),
    basic_salary: z.string(),
    gross_salary: z.string(),
    medical: z.string(),
    lta: z.string(),
    gratuity: z.string().optional(),
    has_bonus: z.boolean().optional(),
    has_conveyance: z.boolean().optional(),
    has_hra: z.boolean().optional(),
    has_allowances: z.boolean().optional(),
    has_special_allowance: z.boolean().optional(),
    has_esi: z.boolean().optional(),
    has_pf: z.boolean().optional(),
});

type Employee = z.infer<typeof EmployeeSchema>;

export default function SalaryDetailsForm() {
    const [isLoading, setIsLoading] = useState(false);


    const [components, setComponents] = useState({
        is_gross_based: true,
        is_component_based: false,
    });
    const { employee_id } = useEmployeeStore();

    // Initialize form
    const form1 = useForm<Employee>({
        resolver: zodResolver(EmployeeSchema),
        defaultValues: {
            hra: "",
            basic_salary: "",
            gross_salary: "",
            lta: "",
            medical: "",
            gratuity: "",
            has_bonus: false,
            has_conveyance: false,
            has_hra: false,
            has_allowances: false,
            has_special_allowance: false,
            has_esi: false,
            has_pf: false,

        },
    });
    const form2 = useForm<Employee>({
        resolver: zodResolver(EmployeeSchema),
        defaultValues: {
            hra: "",
            basic_salary: "",
            gross_salary: "",
            lta: "",
            medical: "",
            gratuity: "",
            has_bonus: false,
            has_conveyance: false,
            has_hra: false,
            has_allowances: false,
            has_special_allowance: false,
            has_esi: false,
            has_pf: false,

        },
    });

    async function onSubmit(data: Employee, _Employee2: any) {
        try {
            setIsLoading(true);

            let requestBody;
            form1.reset()
            form2.reset()


            if (components.is_gross_based) {
                requestBody = {
                    employee: employee_id,
                    is_gross_based: true,
                    gross_salary: parseFloat(data.gross_salary),
                    medical: parseFloat(data.medical),
                    lta: parseFloat(data.lta),
                    gratuity: parseFloat(data.gratuity || "0"), // Ensure to include this field

                    has_bonus: data.has_bonus,
                    has_conveyance: data.has_conveyance,
                    has_hra: data.has_hra,
                    has_allowances: data.has_allowances,
                    has_special_allowance: data.has_special_allowance,
                    has_esi: data.has_esi,
                    has_pf: data.has_pf,
                };
            } else {
                requestBody = {
                    employee: employee_id,
                    is_gross_based: false,
                    is_component_based: true,
                    basic_salary: parseFloat(data.basic_salary),
                    hra: parseFloat(data.hra || "0"), // Ensure it's parsed correctly
                    medical: parseFloat(data.medical),
                    lta: parseFloat(data.lta),
                    gratuity: parseFloat(data.gratuity || "0"),
                    has_bonus: data.has_bonus,
                    has_conveyance: data.has_conveyance,
                    has_hra: data.has_hra,
                    has_special_allowance: data.has_special_allowance,
                    has_esi: data.has_esi,
                    has_pf: data.has_pf,
                    has_allowances: data.has_allowances,
                    // Add any other relevant fields here
                };
            }

            await apiCaller.post("/api/payroll_app/salary-structures/", requestBody);
            toast({
                description: "Salary successfully added",
            });
        } catch (err) {
            console.error(err); // Log the error for debugging
            toast({
                description: "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    // Handle checkbox toggle
    const handleCheckboxChange = (type: string) => {
        if (type === "is_component_based") {
            setComponents({
                is_gross_based: false,
                is_component_based: true,
            });
        } else {
            setComponents({
                is_gross_based: true,
                is_component_based: false,
            });
        }
    };

    return (
        <div className="mt-10">
            <div className="flex justify-between">
                <div className="flex items-center mb-2">
                    <Checkbox
                        id="is_gross_based"
                        checked={components.is_gross_based}
                        onCheckedChange={() => handleCheckboxChange("is_gross_based")}
                    />
                    <label htmlFor="is_gross_based" className="ml-2 font-semibold">Gross Based</label>
                </div>

                <div className="flex items-center mb-2">
                    <Checkbox
                        id="is_component_based"
                        checked={components.is_component_based}
                        onCheckedChange={() => handleCheckboxChange("is_component_based")}
                    />
                    <label htmlFor="is_component_based" className="ml-2 font-semibold">Component Based</label>
                </div>
            </div>

            <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md mt-10">
                <Form {...form1}>
                    <form onSubmit={form1.handleSubmit(onSubmit)}>
                        {components.is_gross_based ? (
                            <div className="flex flex-col mb-4">
                                <div className="flex justify-between">
                                    <FormField
                                        control={form1.control}
                                        name="gross_salary"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gross Salary</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter gross amount" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form1.control}
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
                                    <FormField
                                        control={form1.control}
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


                                {/* checkboxes */}
                                <div className="flex flex-col mb-4 mt-5">
                                    <FormField
                                        control={form1.control}
                                        name="has_hra"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_hra" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="has_hra">HRA</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form1.control}
                                        name="has_allowances"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_allowances" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="has_allowances">Allowances</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form1.control}
                                        name="has_conveyance"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_conveyance" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="has_conveyance">Conveyance</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form1.control}
                                        name="has_bonus"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_bonus" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="has_bonus">Bonus</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form1.control}
                                        name="has_special_allowance"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_special_allowance" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="has_special_allowance">Special Allowance</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form1.control}
                                        name="has_esi"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_esi" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="has_esi">ESI</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </div>
                        ) : components.is_component_based ? (
                            <div className="flex flex-col mb-4">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <FormField
                                        control={form2.control}
                                        name="basic_salary"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Basic Salary</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter basic amount" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form2.control}
                                        name="hra"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>HRA</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter HRA amount" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form2.control}
                                        name="allowances"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Allowance</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter allowance amount" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form2.control}
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
                                    <FormField
                                        control={form2.control}
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

                                {/* checkboxes */}
                                <div className="flex flex-col mb-4 mt-5">
                                    <FormField
                                        control={form2.control}
                                        name="has_hra"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_hra" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="has_hra">HRA</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form2.control}
                                        name="has_allowances"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_allowances" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="has_allowances">Allowances</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form2.control}
                                        name="has_conveyance"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_conveyance" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="has_conveyance">Conveyance</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form2.control}
                                        name="has_bonus"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_bonus" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="has_bonus">Bonus</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form2.control}
                                        name="has_special_allowance"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_special_allowance" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="has_special_allowance">Special Allowance</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form2.control}
                                        name="has_esi"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_esi" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="has_esi">ESI</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form2.control}
                                        name="has_pf"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border-none p-4">
                                                <FormControl>
                                                    <input type="checkbox" id="has_esi" checked={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel htmlFor="pf">PF</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </div>
                        ) : null}

                        <div className="flex justify-center">
                            <Button type="submit" className="mt-4 " disabled={isLoading}>
                                {isLoading && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? "Saving..." : "Add Salary Details"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}