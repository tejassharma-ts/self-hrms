import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CustomCalendar = () => {
    const [selectedLink, setSelectedLink] = useState('Calendar'); 
    const [selectedMonth, setSelectedMonth] = useState(4);
    const [selectedYear, setSelectedYear] = useState(2045);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

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
            setSelectedMonth(selectedMonth - 1);         }
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

    

    return (
        <div>
            <div className="flex items-center justify-center relative">
                <button
                    onClick={handlePrevious}
                    className="text-lg h-10 w-10 rounded-full border hover:bg-gray-300 absolute left-80"
                >
                    &lt;
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
                    className="text-lg h-10 w-10 rounded-full border hover:bg-gray-300 absolute right-80"
                >
                    &gt;
                </button>
            </div>

            <div className="mt-10 grid grid-cols-7 gap-2">
                {[...Array(31)].map((_, index) => (
                    <div
                        key={index}
                        onClick={() => handleDateSelect(index + 1)}
                        className={`w-full h-32 border flex px-5 py-2 cursor-pointer ${selectedDate === index + 1 ? 'bg-black text-white rounded-xl' : ''
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
