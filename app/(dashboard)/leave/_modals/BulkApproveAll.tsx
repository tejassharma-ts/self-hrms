import React from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface BulkapproveAllProps {
    isOpen: boolean;
    onClose: () => void;
}

const BulkapproveAll: React.FC<BulkapproveAllProps> = ({ isOpen, onClose }) => {
    const handleApproveAll = () => {
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button className='bg-white hover:bg-white border border-[#14AE5C] text-[#14AE5C]'>
                    Approve all
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle className="flex justify-center text-2xl">Are you sure you want to approve?</DialogTitle>
                </DialogHeader>
                <div className="h-40 border rounded-lg"></div>
                <div className="mb-4 flex items-center justify-around">
                    <Button onClick={handleApproveAll}>Approve all</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BulkapproveAll;
