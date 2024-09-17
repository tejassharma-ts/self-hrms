import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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
            console.log("Deduction Data being sent:", deductionData);

            const response = await apiCaller.post("api/payroll_app/deductions/", deductionData);
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Deduction Type */}
                    <div>
                        <label className="block text-sm font-medium">Deduction Type</label>
                        <Select
                            onValueChange={(value: string) => form.setValue("deductionType", value)}
                            defaultValue={form.getValues("deductionType")}
                        >
                            <SelectTrigger className="mt-1 block w-full h-11">
                                <SelectValue placeholder="Select deduction type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Leave deduction">Leave deduction</SelectItem>
                                <SelectItem value="Late Deduction">Late Deduction</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Amount</label>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            {...form.register("amount")}
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Reason</label>
                        <Input
                            type="text"
                            placeholder="Enter reason"
                            {...form.register("reason")}
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Date Applied</label>
                        <Input
                            type="date"
                            {...form.register("dateApplied")}
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div className="flex justify-between mt-6">
                        <Button type="submit" className="bg-black text-white py-2 px-4 rounded-lg">
                            Add Deduction
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddDeduction;
