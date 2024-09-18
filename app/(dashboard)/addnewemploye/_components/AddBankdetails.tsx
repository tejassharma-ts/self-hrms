'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { CalendarIcon } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { PasswordInput } from '@/app/(auth)/auth/_components/PasswordInput';

// Validation schema using Zod
const employeeSchema = z.object({
    AccountHolderName: z.string().min(1, 'Full Name is required'),
    AccountNumber: z.string().min(1, 'Role is required'),
    IfscCode: z.string().min(1, 'Department is required'),

});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const AddBankDetails = () => {
    const form = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            AccountHolderName: '',
            AccountNumber: '',
            IfscCode: '',
        },
    });

    const onSubmit = (data: EmployeeFormValues) => {
        console.log(data);
    };

    return (
        <div>

            <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Basic Info Section */}
                        <div className="flex gap-6 mb-8">
                            <h2 className="text-lg font-semibold w-96">Basic Info</h2>
                            <div className=" w-full">
                                <FormField
                                    control={form.control}
                                    name="AccountHolderName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Account Holder Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Full Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="AccountNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Account Number</FormLabel>
                                            <FormControl>
                                                <PasswordInput placeholder='Enter your Account number' className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="IfscCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>IFSC Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Full Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" className="text-white px-6 py-2 rounded-lg">
                                Add Bank Details
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default AddBankDetails;
