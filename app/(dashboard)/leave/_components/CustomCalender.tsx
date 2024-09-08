import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// import { Calendarcomponent } from "@/components/calendarcomponent";
import { api } from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

type EventsDataApi = {
  [key: string]: {
    date: string;
    description: string;
    name: string;
  }[];
};

type Event = {
  date: string;
  description: string;
  name: string;
};

const eventSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name should not exceed 100 characters"),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters")
    .max(500, "Description should not exceed 500 characters"),
});

export default function CustomCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [events, setEvents] = useState<Event[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      description: "",
      date: new Date(),
    },
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [2020, 2021, 2022, 2023, 2024, 2045];

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  async function fetchData() {
    try {
      const res = await api.get<EventsDataApi>("api/attendance_app/get-holidays/", {
        params: {
          year: selectedYear,
          month: selectedMonth + 1,
        },
      });
      let activeMonth = Object.keys(res.data)[0] as string;
      setEvents(res.data[activeMonth] ? res.data[activeMonth] : []);
    } catch (error) {
      console.error("Failed to fetch filtered data:", error);
    }
  }

  async function onAddHoliday(values: z.infer<typeof eventSchema>) {
    try {
      setIsLoading(true);
      const formattedDate = format(new Date(values.date), "yyyy-MM-dd");
      // TODO: may be we need a funtionality to add multiple holidays
      const holidays = [
        {
          ...values,
          date: formattedDate,
        },
      ];
      await api.post("/api/attendance_app/holidays/", holidays);
      toast({
        description: "Holiday has been added successfully",
      });
      setIsHolidayModalOpen(false);
    } catch (err) {
      toast({
        description: "Failed to add holiday. Please try again later!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handlePrevious() {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }

  function handleNext() {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }

  function getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

  return (
    <div>
      <div className="flex">
        <Dialog open={isHolidayModalOpen} onOpenChange={setIsHolidayModalOpen}>
          <DialogTrigger asChild className="ml-auto">
            <Button variant="outline" className="space-x-2">
              <Icons.add size={13} />
              <span>Add Holidays</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="flex justify-center">Holiday Submission Form</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddHoliday)} className="flex flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Nawroz" {...field} />
                      </FormControl>
                      <FormDescription>Add name of the hoilday</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Persian New Year, celebrated as the first day of spring"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Add description</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of holiday</FormLabel>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}>
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date <= new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button disabled={isLoading} type="submit" className="flex-1 space-x-2">
                    {isLoading && <Icons.loader />}
                    <span>Add holiday</span>
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative flex items-center justify-center space-x-8">
        <button
          onClick={handlePrevious}
          className="flex size-9 items-center justify-center rounded-full border text-lg hover:bg-gray-300">
          <Icons.left className="size-6" />
        </button>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-xl font-semibold text-black">
              {months[selectedMonth]}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-2">
              {months.map((month, index) => (
                <DropdownMenuItem
                  key={month}
                  className="mt-2 rounded-lg bg-white text-[#666666]"
                  onClick={() => setSelectedMonth(index)}>
                  {month}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-xl font-semibold text-black">
              {selectedYear}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-2">
              {years.map((year) => (
                <DropdownMenuItem
                  key={year}
                  className="mt-2 rounded-lg bg-white text-[#666666]"
                  onClick={() => setSelectedYear(year)}>
                  {year}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          onClick={handleNext}
          className="flex size-9 items-center justify-center rounded-full border text-lg hover:bg-gray-300">
          <Icons.right className="size-6" />
        </button>
      </div>

      <div className="mt-10 grid grid-cols-7">
        {Array.from({ length: daysInMonth }).map((_, day) => {
          const date = new Date(selectedYear, selectedMonth, day + 1);
          const formattedDate = date.toLocaleString("sv-SE").split(" ")[0];
          const event = events.find((event) => event.date === formattedDate);

          const isHoliday = event && event.date === formattedDate;
          return (
            <div
              key={day}
              className={cn(
                "relative flex h-32 w-full cursor-pointer items-center justify-center rounded-sm border border-dashed px-5 py-2",
                {
                  "bg-black text-white": isHoliday,
                },
              )}>
              <span className="absolute left-2 top-2">{day + 1}</span>
              {event && <h1 className="text-center font-medium">{event.name}</h1>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
