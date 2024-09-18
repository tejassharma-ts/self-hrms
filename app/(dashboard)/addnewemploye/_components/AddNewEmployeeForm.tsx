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
    fullName: z.string().min(1, 'Full Name is required'),
    role: z.string().min(1, 'Role is required'),
    department: z.string().min(1, 'Department is required'),
    joiningDate: z.string().min(1, 'Joining Date is required'),
    jobTitle: z.string().min(1, 'Job Title is required'),
    gender: z.string().min(1, 'Gender is required'),
    officialEmail: z.string().email('Invalid email').min(1, 'Official Email is required'),
    personalEmail: z.string().email('Invalid email').min(1, 'Personal Email is required'),
    mobileNumber: z.string().min(1, 'Mobile Number is required'),
    emergencyContact: z.string().min(1, 'Emergency Contact Number is required'),
    currentaddress: z.string().min(1, 'Current Address is required'),
    peremantaddress: z.string().min(1, 'Peremant Address is required'),
    aadhar: z.string().min(1, 'Aadhar number is required'),
    pan: z.string().min(1, 'pan card number is required'),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const AddNewEmployeeForm = () => {
    const form = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            fullName: '',
            role: '',
            department: '',
            joiningDate: '',
            jobTitle: '',
            gender: '',
            officialEmail: '',
            personalEmail: '',
            mobileNumber: '',
            emergencyContact: '',
            currentaddress: '',
            peremantaddress: '',
            aadhar: '',
            pan: '',
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
                        <div className="flex flex-row gap-6 mb-8">
                            <h2 className="text-lg font-semibold w-96">Basic Info</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Full Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Select Role</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="HR">HR</SelectItem>
                                                        <SelectItem value="Finance">Finance</SelectItem>
                                                        <SelectItem value="Marketing">Marketing</SelectItem>
                                                        <SelectItem value="Engineering">Engineering</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="joiningDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date of Joining</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input type="date" {...field} />
                                                    <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Select Department</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Department" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Design">Design</SelectItem>
                                                        <SelectItem value="Finance">Finance</SelectItem>
                                                        <SelectItem value="Marketing">Marketing</SelectItem>
                                                        <SelectItem value="Development">Development</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="jobTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Job Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Job Title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gender</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Male">Male</SelectItem>
                                                        <SelectItem value="Female">Female</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Contact Info Section */}
                        <div className="flex flex-row gap-6 mb-8">
                            <h2 className="text-lg font-semibold w-96">Contact Info</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                                <FormField
                                    control={form.control}
                                    name="officialEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Official E-mail ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Official Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="personalEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Personal E-mail ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Personal Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mobileNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Mobile Number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="emergencyContact"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Emergency Contact Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Emergency Contact Number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="flex flex-row gap-6 mb-8 w-full">
                            <h2 className="text-lg font-semibold w-96">Address</h2>
                            <div className="grid grid-cols-1 w-full">
                                <FormField
                                    control={form.control}
                                    name="currentaddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your Current Address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="peremantaddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Perament Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your Perament Address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </div>

                        {/* Upload Documents Section */}
                        <div className="flex flex-row gap-6 mb-8">
                            <h2 className="text-lg font-semibold w-96">Upload Documents</h2>
                            <div className="grid grid-cols-1 w-full">

                                <FormField
                                    control={form.control}
                                    name="pan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pan number</FormLabel>
                                            <FormControl>
                                                <PasswordInput placeholder='Enter your Pan number' className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="aadhar"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Addhar Number</FormLabel>
                                            <FormControl>
                                                <PasswordInput placeholder='****   ****  ****  ****' className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" className="text-white px-6 py-2 rounded-lg">
                                Add Employee
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default AddNewEmployeeForm;
