import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState, FC, ChangeEvent, FormEvent } from 'react';
import { BonusData, BonusResponse } from '@/types/types';
import { apiCaller } from '@/lib/auth';

interface AddBonusProps {
    employeeID: string;
}

const AddBonus: FC<AddBonusProps> = ({ employeeID }) => {
    console.log('Dynamic ID:', employeeID);
    const [bonusType, setBonusType] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [currency, setCurrency] = useState<string>('INR');
    const [payoutDate, setPayoutDate] = useState<string>('');
    const [note, setNote] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const data: BonusData = {
                employee: employeeID,
                bonus_type_names: [bonusType],
                amount: amount,
                reason: note,
                date_awarded: payoutDate,
            };
            console.log('Employee ID:', employeeID);
            console.log('Data being sent:', data);

            const response = await apiCaller.post<BonusResponse>('/api/payroll_app/bonuses/', data);

            console.log('Bonus added successfully:', response.data);
        } catch (error) {
            console.error('Error adding bonus:', (error as any).response?.data || (error as any).message);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-transparent border-none hover:bg-transparent text-black'>Add Bonus</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Bonus for { }</DialogTitle>
                    <DialogDescription>Fill in the details below to add a bonus.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Bonus Type</label>
                        <Select onValueChange={(value) => setBonusType(value)}>
                            <SelectTrigger className="mt-1 block w-full h-11">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Performance">Performance</SelectItem>
                                <SelectItem value="Holiday">Holiday</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Select onValueChange={(value) => setCurrency(value)}>
                            <SelectTrigger className="mt-1 block w-20 h-11">
                                <SelectValue>{currency}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="INR">INR</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            type="number"
                            placeholder="5000"
                            value={amount}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Payout Date</label>
                        <Input
                            type="date"
                            value={payoutDate}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPayoutDate(e.target.value)}
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Note</label>
                        <Textarea
                            placeholder="Add a note"
                            value={note}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div className="flex justify-between mt-6">
                        <Button
                            type="submit"
                            className="bg-black text-white py-2 px-4 rounded-lg"
                        >
                            Add Bonus
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddBonus;
