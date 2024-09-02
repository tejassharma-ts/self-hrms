// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Icons } from "@/components/Icons";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

// import { Input } from '@/components/ui/input';
// import { Calendarcomponent } from '@/components/calendarcomponent';
// import { api } from '@/api/api';

// const CustomCalendar = () => {
//     const [selectedMonth, setSelectedMonth] = useState(0);
//     const [selectedYear, setSelectedYear] = useState(2024);
//     const [selectedDate, setSelectedDate] = useState<number | null>(null);

//     const [selectedFilter, setSelectedFilter] = useState("");


//     const fetchData = async () => {
//         try {
//             const res = await api.get(`api/company/app/artist-profiles/search-skill/?skills=${selectedFilter}`,
//             );

//             (res.data.data);
//         } catch (error) {
//             console.error("Failed to fetch filtered data:", error);
//         }

//     };




//     const months = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//     ];

//     const years = [2020, 2021, 2022, 2023, 2024, 2045];

//     const handleMonthChange = (monthIndex: number) => {
//         setSelectedMonth(monthIndex);
//     };

//     const handleYearChange = (year: number) => {
//         setSelectedYear(year);
//     };

//     const handlePrevious = () => {
//         if (selectedMonth === 0) {
//             setSelectedMonth(11);
//             setSelectedYear(selectedYear - 1);
//         } else {
//             setSelectedMonth(selectedMonth - 1);
//         }
//     };

//     const handleNext = () => {
//         if (selectedMonth === 11) {
//             setSelectedMonth(0);
//             setSelectedYear(selectedYear + 1);
//         } else {
//             setSelectedMonth(selectedMonth + 1);
//         }
//     };



//     const handleDateSelect = (date: number) => {
//         setSelectedDate(date);
//         console.log(`Selected Date: ${months[selectedMonth]} ${date}, ${selectedYear}`);
//     };

//     const getDaysInMonth = (month: number, year: number) => {
//         return new Date(year, month + 1, 0).getDate();
//     };

//     const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);



//     return (
//         <div>
//             <div className="mb-4">
//                 <Dialog>
//                     <DialogTrigger asChild>
//                         <Button className='bg-white hover:bg-white text-black border rounded-full'>+ Add Holidays</Button>
//                     </DialogTrigger>

//                     <DialogContent className='bg-white'>
//                         <DialogHeader>
//                             <DialogTitle className='flex justify-center'>Add Holiday</DialogTitle>
//                             <DialogDescription>
//                                 <div className="">
//                                     <p className='text-xl font-semibold text-black'>Occasion</p>
//                                     <Input className='mt-2' placeholder='Enter Reason' />
//                                 </div>
//                             </DialogDescription>
//                         </DialogHeader>
//                         <div className='flex items-center justify-between mb-4'>
//                             <div className='gap-5 bg-white flex'>
//                                 {/* <CalendarIcon /> */}
//                                 <Calendarcomponent />

//                             </div>
//                         </div>

//                     </DialogContent>
//                 </Dialog>
//             </div>
//             <div className="flex items-center justify-center relative">
//                 <button
//                     onClick={handlePrevious}
//                     className="text-lg h-10 w-10 rounded-full border hover:bg-gray-300 absolute left-0"
//                 >
//                     <Icons.left className="size-6 ml-1" />
//                 </button>

//                 <div className="flex items-center gap-4">
//                     <DropdownMenu>
//                         <DropdownMenuTrigger className='font-semibold text-xl text-black'>
//                             {months[selectedMonth]}
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className='bg-white p-2'>
//                             {months.map((month, index) => (
//                                 <DropdownMenuItem
//                                     key={month}
//                                     className='mt-2 bg-white rounded-lg text-[#666666]'
//                                     onClick={() => handleMonthChange(index)}
//                                 >
//                                     {month}
//                                 </DropdownMenuItem>
//                             ))}
//                         </DropdownMenuContent>
//                     </DropdownMenu>

//                     <DropdownMenu>
//                         <DropdownMenuTrigger className='font-semibold text-xl text-black'>
//                             {selectedYear}
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className='bg-white p-2'>
//                             {years.map((year) => (
//                                 <DropdownMenuItem
//                                     key={year}
//                                     className='mt-2 bg-white rounded-lg text-[#666666]'
//                                     onClick={() => handleYearChange(year)}
//                                 >
//                                     {year}
//                                 </DropdownMenuItem>
//                             ))}
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </div>

//                 <button
//                     onClick={handleNext}
//                     className="text-lg h-10 w-10 rounded-full border hover:bg-gray-300 absolute right-0"
//                 >
//                     <Icons.right className="size-6 ml-2" />
//                 </button>
//             </div>

//             <div className="mt-10 grid grid-cols-7 gap-2">
//                 {[...Array(daysInMonth).keys()].map((index) => (
//                     <div
//                         key={index}
//                         onClick={() => handleDateSelect(index + 1)}
//                         className={`w-full h-32 border flex items-center justify-center px-5 py-2 cursor-pointer ${selectedDate === index + 1 ? 'bg-black text-white rounded-xl' : ''
//                             }`}
//                     >
//                         {index + 1}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CustomCalendar;
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from "@/components/Icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Calendarcomponent } from '@/components/calendarcomponent';
import { api } from '@/api/api';

const CustomCalendar = () => {
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [events, setEvents] = useState<any>({});

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = [2020, 2021, 2022, 2023, 2024, 2045];

    useEffect(() => {
        fetchData();
    }, [selectedMonth, selectedYear]);

    const fetchData = async () => {
        try {
            const res = await api.get(`api/attendance_app/get-holidays/?year=${selectedYear}&month=${selectedMonth + 1}`);
            const filteredEvents = res.data;
            setEvents(filteredEvents);
        } catch (error) {
            console.error("Failed to fetch filtered data:", error);
        }
    };

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

    const getEventsForDate = (date: number) => {
        const monthName = months[selectedMonth];
        const dateString = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
        return events[monthName]?.filter((event: any) => event.date === dateString) || [];
    };

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
                                    <Input className='mt-2' placeholder='Enter Reason' />
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='gap-5 bg-white flex'>
                                <Calendarcomponent />
                            </div>
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
                {[...Array(daysInMonth).keys()].map((index) => {
                    const date = index + 1;
                    const eventNames = getEventsForDate(date).map((event: { name: any; }) => event.name).join(', ');

                    return (
                        <div
                            key={index}
                            onClick={() => handleDateSelect(date)}
                            className={`w-full h-32 border flex items-center justify-center px-5 py-2 cursor-pointer ${selectedDate === date ? 'bg-black text-white rounded-xl' : ''
                                }`}
                        >
                            {date}
                            {eventNames && (
                                <p className="text-sm mt-2 text-center">
                                    {eventNames}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomCalendar;
