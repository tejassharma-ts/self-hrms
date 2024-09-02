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
    // const { tokken, apiCaller } = useUserAuth();


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
                                    <Input className='mt-2' placeholder='Enter Reason' />
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='gap-5 bg-white flex'>
                                {/* <CalendarIcon /> */}
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















// google calender

// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Icons } from "@/components/Icons";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { gapi } from 'gapi-script';
// import { CalendarIcon } from 'lucide-react';
// import { Calendarcomponent } from '@/components/calendarcomponent';

// const CLIENT_ID = "YOUR_CLIENT_ID.apps.googleusercontent.com";
// const API_KEY = "YOUR_API_KEY";
// const SCOPES = "https://www.googleapis.com/auth/calendar.events.readonly";

// const CustomCalendar = () => {
//     const [selectedMonth, setSelectedMonth] = useState(4);
//     const [selectedYear, setSelectedYear] = useState(2045);
//     const [events, setEvents] = useState<any[]>([]);

//     useEffect(() => {
//         const start = async () => {
//             console.log("Loading GAPI...");
//             gapi.load('client:auth2', initClient);
//         };
//         start();
//     }, []);

//     const initClient = () => {
//         gapi.client.init({
//             apiKey: API_KEY,
//             clientId: CLIENT_ID,
//             discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
//             scope: SCOPES,
//         }).then(() => {
//             console.log("GAPI initialized");
//             if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
//                 listUpcomingEvents();
//             } else {
//                 gapi.auth2.getAuthInstance().signIn().then(() => {
//                     listUpcomingEvents();
//                 });
//             }
//         }).catch((error: any) => {
//             console.error("Error initializing GAPI client:", error);
//         });
//     };


//     const listUpcomingEvents = () => {
//         gapi.client.calendar.events.list({
//             'calendarId': 'primary',
//             'timeMin': (new Date()).toISOString(),
//             'showDeleted': false,
//             'singleEvents': true,
//             'maxResults': 10,
//             'orderBy': 'startTime'
//         }).then((response: any) => {
//             const events = response.result.items;
//             console.log("Events fetched:", events);
//             setEvents(events);
//         }).catch((error: any) => {
//             console.error("Error fetching events:", error);
//         });
//     };


//     return (
//         <div>
//             <div className="mb-4 ">
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
//                                     <Input className='mt-2' />
//                                 </div>
//                             </DialogDescription>
//                         </DialogHeader>
//                         <div className='flex items-center justify-between mb-4'>
//                             <div className='gap-5 bg-white flex'>
//                                 <CalendarIcon />
//                                 <Calendarcomponent />

//                             </div>
//                         </div>
//                     </DialogContent>
//                 </Dialog>
//             </div>

//             <div className="flex items-center justify-center relative">
//                 <button
//                     onClick={() => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))}
//                     className="text-lg h-10 w-10 rounded-full border hover:bg-gray-300 absolute left-0"
//                 >
//                     <Icons.left className="size-6 ml-1" />
//                 </button>

//                 <div className="flex items-center gap-4">
//                     <DropdownMenu>
//                         <DropdownMenuTrigger className='font-semibold text-xl text-black'>
//                             {new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })}
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className='bg-white p-2'>
//                             {Array.from({ length: 12 }).map((_, index) => (
//                                 <DropdownMenuItem
//                                     key={index}
//                                     className='mt-2 bg-white rounded-lg text-[#666666]'
//                                     onClick={() => setSelectedMonth(index)}
//                                 >
//                                     {new Date(0, index).toLocaleString('default', { month: 'long' })}
//                                 </DropdownMenuItem>
//                             ))}
//                         </DropdownMenuContent>
//                     </DropdownMenu>

//                     <DropdownMenu>
//                         <DropdownMenuTrigger className='font-semibold text-xl text-black'>
//                             {selectedYear}
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className='bg-white p-2'>
//                             {[...Array(5)].map((_, index) => {
//                                 const year = 2020 + index;
//                                 return (
//                                     <DropdownMenuItem
//                                         key={year}
//                                         className='mt-2 bg-white rounded-lg text-[#666666]'
//                                         onClick={() => setSelectedYear(year)}
//                                     >
//                                         {year}
//                                     </DropdownMenuItem>
//                                 );
//                             })}
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </div>

//                 <button
//                     onClick={() => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))}
//                     className="text-lg h-10 w-10 rounded-full border hover:bg-gray-300 absolute right-0"
//                 >
//                     <Icons.right className="size-6 ml-2" />
//                 </button>
//             </div>

//             <div className="mt-10">
//                 <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
//                 <ul>
//                     {events.map((event, index) => (
//                         <li key={index} className="mb-2">
//                             <strong>{event.summary}</strong><br />
//                             {new Date(event.start.dateTime || event.start.date).toLocaleString()}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default CustomCalendar;
