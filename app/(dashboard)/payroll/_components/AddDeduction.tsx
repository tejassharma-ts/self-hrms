import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { apiCaller } from "@/lib/auth";

const formSchema = z.object({
    deductionType: z.string().min(1, { message: "Deduction type is required" }),
    amount: z.string().min(1, { message: "Amount is required" }),
    reason: z.string().optional(),
    dateApplied: z.string().min(1, { message: "Date applied is required" }),
});

interface AddDeductionProps {
    employeeID: string;
}

const AddDeduction: React.FC<AddDeductionProps> = ({ employeeID }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            deductionType: "Leave deduction",
            amount: "",
            reason: "",
            dateApplied: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const deductionData = {
                employee: employeeID,
                deduction_type_names: [values.deductionType],
                amount: values.amount,
                reason: values.reason,
                date_applied: values.dateApplied,
            };

            const response = await apiCaller.post("/api/payroll_app/deductions/", deductionData);
            console.log("Deduction added successfully:", response.data);
        } catch (error) {
            console.error("Error adding deduction:", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full rounded-none">Add Deduction</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Deduction</DialogTitle>
                    <DialogDescription>Fill in the details below to add a deduction.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="deductionType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deduction Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select deduction type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Leave deduction">Leave deduction</SelectItem>
                                            <SelectItem value="Late Deduction">Late Deduction</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter amount" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reason</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter reason" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dateApplied"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date Applied</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="bg-black text-white py-2 px-4 rounded-lg">
                            Add Deduction
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddDeduction;
