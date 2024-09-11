"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState, FC } from 'react';
import { apiCaller } from '@/lib/auth';

interface DeductionData {
    employee: string;
    deduction_type_names: string[];
    amount: string;
    reason: string;
    date_applied: string;
}

interface AddDeductionProps {
    employeeID: string;
}

const AddDeduction: FC<AddDeductionProps> = ({ employeeID }) => {
    const [deductionTypes, setDeductionTypes] = useState<string[]>(['Leave deduction', 'Late Deduction']);
    const [selectedDeductionType, setSelectedDeductionType] = useState<string>(deductionTypes[0]);
    const [amount, setAmount] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [dateApplied, setDateApplied] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const deductionData: DeductionData = {
            employee: employeeID,
            deduction_type_names: [selectedDeductionType],
            amount,
            reason,
            date_applied: dateApplied,
        };

        try {
            const response = await apiCaller.post('api/payroll_app/deductions/', deductionData);

            if (response.status === 201) {
                console.log('API Response:', response.data);
                setAmount('');
                setReason('');
                setDateApplied('');
                setSelectedDeductionType(deductionTypes[0]);
            } else {
                setErrorMessage('Failed to add deduction. Please try again.');
            }
        } catch (error: any) {
            if (error.response) {
                console.error('Error Response:', error.response);
                if (error.response.data.detail === 'Company not found') {
                    setErrorMessage('Error: The payroll company was not found. Please check the payroll ID.');
                } else {
                    setErrorMessage(`Error: ${error.response.data.detail || 'Something went wrong'}`);
                }
            } else if (error.request) {
                console.error('No response from server:', error.request);
                setErrorMessage('No response from the server. Please check your connection.');
            } else {
                console.error('Error:', error.message);
                setErrorMessage(`Error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-transparent border-none hover:bg-transparent text-black'>
                    Add Deduction
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Deduction</DialogTitle>
                    <DialogDescription>Fill in the details below to add a deduction.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Deduction Type</label>
                        <Select onValueChange={(value: string) => setSelectedDeductionType(value)}>
                            <SelectTrigger className="mt-1 block w-full h-11">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                {deductionTypes.map((type, index) => (
                                    <SelectItem key={index} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Amount</label>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Reason</label>
                        <Input
                            type="text"
                            placeholder="Enter reason"
                            value={reason}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReason(e.target.value)}
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Date Applied</label>
                        <Input
                            type="date"
                            value={dateApplied}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateApplied(e.target.value)}
                            className="mt-1 block w-full"
                        />
                    </div>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    <div className="flex justify-between mt-6">
                        <Button
                            type="submit"
                            className="bg-black text-white py-2 px-4 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Deduction'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddDeduction;
