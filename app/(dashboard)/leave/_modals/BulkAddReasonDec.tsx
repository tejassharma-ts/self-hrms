import React from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface BulkAddReasonDecProps {
    isOpen: boolean;
    onClose: () => void;
}

const BulkAddReasonDec: React.FC<BulkAddReasonDecProps> = ({ isOpen, onClose }) => {
    const handleDeclineAll = () => {
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button className="bg-white hover:bg-white border border-[#DA2A2A] text-[#DA2A2A]">
                    Decline All
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle className="flex justify-center text-2xl">Reason for Declination</DialogTitle>
                    <p className="text-md font-semibold text-black">Add Reason for Richard</p>
                </DialogHeader>
                <DialogDescription>
                    <Textarea className="border rounded-lg"></Textarea>
                </DialogDescription>
                <div className="h-40"></div>
                <div className="mb-4 flex items-center justify-around">
                    <Button onClick={handleDeclineAll}>Decline All</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BulkAddReasonDec;
