
'use client';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { PasswordInput } from '@/app/(auth)/auth/_components/PasswordInput';
import { apiCaller } from '@/lib/auth';
import { Icons } from '@/components/Icons';
import { toast } from '@/hooks/use-toast';

const employeeSchema = z.object({
    aadhar_number: z.string().optional(),
    pan_number: z.string().min(1, 'PAN Number is required'),
    bank_name: z.string().min(1, 'Bank Name is required'),
    account_number: z.string().min(1, 'Account Number is required'),
    ifsc_code: z.string().min(1, 'IFSC Code is required'),
    is_bank_kyc_done: z.boolean(),
    pan_card_image: z.instanceof(File).optional(),
    aadhaar_card_front_image: z.instanceof(File).optional(),
    aadhaar_card_back_image: z.instanceof(File).optional(),
    passbook_back_image: z.instanceof(File).optional(),
    passbook_port_image: z.instanceof(File).optional(),
    uan_number: z.string().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

interface AddBankDetailsProps {
    employee_id: string;
}

const AddBankDetails = ({ employee_id }: AddBankDetailsProps) => {
    const [filePreviews, setFilePreviews] = useState<Record<string, string | ArrayBuffer | null>>({});
    const [employeeData, setEmployeeData] = useState<EmployeeFormValues | null>(null);
    const [isBankKycDone, setIsBankKycDone] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const form = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            aadhar_number: '',
            pan_number: '',
            bank_name: '',
            account_number: '',
            ifsc_code: '',
            is_bank_kyc_done: false, // Default value set to false
            pan_card_image: undefined,
            aadhaar_card_front_image: undefined,
            aadhaar_card_back_image: undefined,
            passbook_back_image: undefined,
            passbook_port_image: undefined,
            uan_number: '',
        },
    });

    // useEffect(() => {
    //     const fetchEmployeeData = async () => {
    //         try {
    //             const response = await apiCaller.get(`api/companies-app/company/add-employee/?employee_id=${employee_id}`);
    //             const data = response.data;
    //             console.log('employee_id:', employee_id); // Debugging line
    //             form.reset({
    //                 aadhar_number: data.aadhar_number || '',
    //                 pan_number: data.pan_number || '',
    //                 bank_name: data.bank_name || '',
    //                 account_number: data.account_number || '',
    //                 ifsc_code: data.ifsc_code || '',
    //                 is_bank_kyc_done: data.is_bank_kyc_done,
    //                 uan_number: data.uan_number || '',
    //             });
    //             setEmployeeData(data);
    //             setIsBankKycDone(data.is_bank_kyc_done); // Update KYC status
    //         } catch (error) {
    //             console.error('Error fetching employee data:', error);
    //         }
    //     };
    //     fetchEmployeeData();
    // }, [employee_id, form]);

    const handleFileChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreviews((prev) => ({ ...prev, [field]: reader.result }));
            };
            reader.readAsDataURL(file);
            form.setValue(field as keyof EmployeeFormValues, file);
        }
    };


    const onSubmit = async (data: EmployeeFormValues) => {
        try {
            setIsLoading(true);

            // Creating a FormData object
            const formData = new FormData();
            formData.append('aadhar_number', data.aadhar_number || '');
            formData.append('pan_number', data.pan_number || '');
            formData.append('bank_name', data.bank_name || '');
            formData.append('account_number', data.account_number || '');
            formData.append('ifsc_code', data.ifsc_code || '');
            formData.append('is_bank_kyc_done', String(data.is_bank_kyc_done));
            formData.append('uan_number', data.uan_number || '');

            // Append images if they exist
            if (data.pan_card_image) formData.append('pan_card_image', data.pan_card_image);
            if (data.aadhaar_card_front_image) formData.append('aadhaar_card_front_image', data.aadhaar_card_front_image);
            if (data.aadhaar_card_back_image) formData.append('aadhaar_card_back_image', data.aadhaar_card_back_image);
            if (data.passbook_back_image) formData.append('passbook_back_image', data.passbook_back_image);
            if (data.passbook_port_image) formData.append('passbook_port_image', data.passbook_port_image);

            // Sending a PATCH request with the formData
            const response = await apiCaller.patch(`api/companies-app/company/add-employee/?employee_id=${employee_id}`, formData);

            toast({
                description: "Employee Bank details updated successfully",
            });

            console.log('Employee Bank details updated successfully:', response);

        } catch (error) {
            toast({
                description: "Something went wrong while updating employee details",
                variant: "destructive",
            });

            console.error('Error updating employee details:', error);

        } finally {
            setIsLoading(false);
        }
    };


    const isFormDisabled = isBankKycDone;

    return (
        <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
                        <FormField
                            control={form.control}
                            name="bank_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bank Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Bank Name" {...field} disabled={isFormDisabled} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="account_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Account Number</FormLabel>
                                    <PasswordInput placeholder="Enter Account Number" {...field} disabled={isFormDisabled} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ifsc_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>IFSC Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter IFSC Code" {...field} disabled={isFormDisabled} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="aadhar_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Aadhaar Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Aadhaar Number" {...field} disabled={isFormDisabled} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pan_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>PAN Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter PAN Number" {...field} disabled={isFormDisabled} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="uan_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UAN Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter UAN Number" {...field} disabled={isFormDisabled} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {['pan_card_image', 'aadhaar_card_front_image', 'aadhaar_card_back_image', 'passbook_back_image', 'passbook_port_image'].map((name) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={name as keyof EmployeeFormValues}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{name.replace(/_/g, ' ')}</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center space-x-4">
                                                <Input
                                                    type="file"
                                                    onChange={(e) => handleFileChange(name, e)}
                                                    onBlur={field.onBlur}
                                                    ref={field.ref}
                                                    disabled={isFormDisabled}
                                                />
                                                {filePreviews[name] && (
                                                    <img
                                                        src={filePreviews[name] as string}
                                                        alt={`${name.replace(/_/g, ' ')} Preview`}
                                                        className="w-10 h-10 object-cover border rounded"
                                                    />
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                    <Button type="submit" disabled={isFormDisabled} className="mt-2">{isLoading && <Icons.loader />}Save and Continue</Button>
                </form>
            </Form>
        </div>
    );
};

export default AddBankDetails;
