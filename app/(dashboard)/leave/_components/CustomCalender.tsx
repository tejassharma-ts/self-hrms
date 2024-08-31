import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from "@/components/Icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Calendarcomponent } from '@/components/calendarcomponent';

const CustomCalendar = () => {
    const [selectedMonth, setSelectedMonth] = useState(4);
    const [selectedYear, setSelectedYear] = useState(2045);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [fromDate, setFromDate] = React.useState<Date | undefined>(new Date())


    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = [2020, 2021, 2022, 2023, 2024, 2045];

    const handleMonthChange = (monthIndex: number) => {
        setSelectedMonth(monthIndex);
    };

    const handleYearChange = (year: number) => {
        setSelectedYear(year);
    };

    const handlePrevious = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const handleNext = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const handleDateSelect = (date: number) => {
        setSelectedDate(date);
        console.log(`Selected Date: ${months[selectedMonth]} ${date}, ${selectedYear}`);
    };

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

    return (
        <div>
            <div className="mb-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='bg-white hover:bg-white text-black border rounded-full'>+ Add Holidays</Button>
                    </DialogTrigger>

                    <DialogContent className='bg-white'>
                        <DialogHeader>
                            <DialogTitle className='flex justify-center'>Add Holiday</DialogTitle>
                            <DialogDescription>
                                <div className="">
                                    <p className='text-xl font-semibold text-black'>Occasion</p>
                                    <Input className='mt-2' />
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='gap-5 bg-white flex'>
                                <CalendarIcon />
                                <Calendarcomponent />


                            </div>

                        </div>
                        <div className="flex justify-center">
                            <Button className='bg-[#14AE5C] text-white w-fit'>Add Holiday</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex items-center justify-center relative">
                <button
                    onClick={handlePrevious}
                    className="text-lg h-10 w-10 rounded-full border hover:bg-gray-300 absolute left-0"
                >
                    <Icons.left className="size-6 ml-1" />
                </button>

                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger className='font-semibold text-xl text-black'>
                            {months[selectedMonth]}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-white p-2'>
                            {months.map((month, index) => (
                                <DropdownMenuItem
                                    key={month}
                                    className='mt-2 bg-white rounded-lg text-[#666666]'
                                    onClick={() => handleMonthChange(index)}
                                >
                                    {month}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger className='font-semibold text-xl text-black'>
                            {selectedYear}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-white p-2'>
                            {years.map((year) => (
                                <DropdownMenuItem
                                    key={year}
                                    className='mt-2 bg-white rounded-lg text-[#666666]'
                                    onClick={() => handleYearChange(year)}
                                >
                                    {year}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <button
                    onClick={handleNext}
                    className="text-lg h-10 w-10 rounded-full border hover:bg-gray-300 absolute right-0"
                >
                    <Icons.right className="size-6 ml-2" />
                </button>
            </div>

            <div className="mt-10 grid grid-cols-7 gap-2">
                {[...Array(daysInMonth).keys()].map((index) => (
                    <div
                        key={index}
                        onClick={() => handleDateSelect(index + 1)}
                        className={`w-full h-32 border flex items-center justify-center px-5 py-2 cursor-pointer ${selectedDate === index + 1 ? 'bg-black text-white rounded-xl' : ''
                            }`}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomCalendar;
