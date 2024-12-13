"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { cn, combineDateAndTime, getFullbackName } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/Icons";
import { apiCaller } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ScheduleInterview from "./ScheduleInterview";
import { Command, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { useDebouncedCallback } from "use-debounce";
import { ScrollArea } from "@/components/ui/scroll-area";
import MemberTooltip, { MemberAvatar } from "@/components/member-tooltip";
import { DialogClose } from "@radix-ui/react-dialog";
import useMultiSelect from "@/hooks/use-multiselect";
import useEventStore from "@/model/events";

const eventSchema = z.object({
  title: z
    .string()
    .min(5, "The title must be at least 5 characters long.")
    .max(200, "The title must not exceed 200 characters."),
  description: z
    .string()
    .min(5, "The description must be at least 5 characters long.")
    .max(500, "The description must not exceed 500 characters."),
  add_link: z.string().url({ message: "Enter a valid URL (e.g., https://example.com)." }),
  date: z.date({ invalid_type_error: "Provide a valid date in the format YYYY-MM-DD." }),
  team: z.array(z.string()).min(1, "Select at least one team member."),
  time: z.string().min(1, "Specify the time for the event."),
});

export default function ScheduleMeeting({
  setShowDialog,
  defaultForm,
}: {
  setShowDialog: any;
  defaultForm?: string;
}) {
  const [selectedOption, setSelectedOption] = useState("meeting");

  useEffect(() => {
    if (!defaultForm) return;
    setSelectedOption(defaultForm);
  }, [defaultForm]);

  return (
    <div className="mt-4 flex flex-col gap-4">
      <RadioGroup
        value={selectedOption}
        onValueChange={setSelectedOption}
        defaultValue="meeting"
        className="grid grid-cols-2 justify-items-center">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="meeting" id="meeting" />
          <Label htmlFor="meeting" className="text-base">
            Meeting
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="interview" id="interview" />
          <Label htmlFor="interview" className="text-base">
            Interview
          </Label>
        </div>
      </RadioGroup>
      {selectedOption === "meeting" ? (
        <ScheduleMeetingForm setShowDialog={setShowDialog} />
      ) : (
        <ScheduleInterview setShowDialog={setShowDialog} />
      )}
    </div>
  );
}

type SearchedEmployee = {
  id: string;
  name: string;
  profile_picture: string;
  department: string;
};

type ScheduleMeetingFormProps = {
  setShowDialog: (value: Boolean) => void;
};
function ScheduleMeetingForm({ setShowDialog }: ScheduleMeetingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<SearchedEmployee[] | []>([]);
  const { meetings, setMeetings } = useEventStore();

  const { handleSelectChange, selectedItems: selectedEmployees } = useMultiSelect<SearchedEmployee>(
    [],
    (item) => item.id,
  );

  useEffect(() => {
    const team = selectedEmployees.reduce((acc: string[], employee) => [...acc, employee.id], []);
    form.setValue("team", team);
  }, [selectedEmployees]);

  const form = useForm<z.infer<typeof eventSchema>>({
    mode: "onChange",
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      add_link: "",
      date: undefined,
      time: undefined,
      team: [],
    },
  });

  async function onSubmit(values: z.infer<typeof eventSchema>) {
    try {
      setIsLoading(true);
      const res = await apiCaller.post("api/companies-app/api-meeting-interview/", {
        ...values,
        type: "event",
        date: combineDateAndTime(values.date, values.time),
        status: "Scheduled",
      });

      if (format(res.data.date, "yyy MM dd") === format(values.date, "yyyy MM dd")) {
        const latestMeetings = [...meetings, res.data];
        setMeetings(latestMeetings);
      }
      setShowDialog(false);
      toast({
        description: `Event has been scheduled at ${format(new Date(res.data.date), "MMMM, EEE, dd")}`,
      });
    } catch (err) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
      console.log("err", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSearchHandler(value: string) {
    try {
      setEmployeeLoading(true);
      const res = await apiCaller.get<SearchedEmployee[]>("/api/employees-app/employees-search/", {
        params: {
          search: value,
        },
      });

      setEmployees(res.data);
    } catch (err) {
      console.log("err", err);
    } finally {
      setEmployeeLoading(false);
    }
  }

  const debouncedTerm = useDebouncedCallback(onSearchHandler, 400);
  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Update" className="placeholder:text-gray-500" />
                  </FormControl>
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
                      className="resize-none text-black placeholder:text-gray-500"
                      {...field}
                      placeholder="Updates on Framejar"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="add_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add link</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://meet.google.com/qpq-snpq-ayo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-16">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover modal>
                      <PopoverTrigger asChild className="rounded-sm">
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
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
                          // disabled={(date) => date <= new Date() || date < new Date("1900-01-01")}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} defaultValue="08:00" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Employees</FormLabel>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className="flex w-full cursor-text items-center space-x-2 rounded-md border py-2 pl-2 text-gray-500">
                      <Icons.Search size={18} />
                      <span>Search by Employee name or Department</span>
                    </DialogTrigger>
                    <DialogContent closeBtn={false} className="p-0">
                      <div className="relative">
                        <Icons.Search
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <Input
                          placeholder="Search by Employee name or Department"
                          className="rounded-none border-t-transparent py-[1.3rem] pl-10"
                          onChange={(e) => debouncedTerm(e.target.value)}
                        />
                      </div>
                      <Command className="p-6 pt-0">
                        <CommandList className="mt-4">
                          <ScrollArea className="h-[300px]">
                            <div className="flex flex-col">
                              {employeeLoading ? (
                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                  <Icons.loader />
                                </span>
                              ) : employees.length ? (
                                employees.map((employee) => (
                                  <CommandItem
                                    className={cn("cursor-pointer")}
                                    onSelect={() => {
                                      handleSelectChange(employee);
                                      // form.setValue("language", language.value);
                                    }}>
                                    <div className="flex space-x-2">
                                      <Avatar>
                                        <AvatarImage src={employee.profile_picture} />
                                        <AvatarFallback>
                                          {getFullbackName(employee.name)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex flex-col">
                                        <span className="font-medium">{employee.name}</span>
                                        <span className="text-gray-500">{employee.department}</span>
                                      </div>
                                    </div>
                                  </CommandItem>
                                ))
                              ) : (
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                  <h1 className="text-gray-500">No employee found name</h1>
                                </div>
                              )}
                            </div>
                          </ScrollArea>
                        </CommandList>
                        <CommandSeparator className="mb-3 mt-2" />
                        <div className="flex justify-between">
                          <div className="flex">
                            {selectedEmployees.map((employee) => (
                              <div onClick={() => handleSelectChange(employee)}>
                                <MemberTooltip
                                  member={{
                                    id: employee.id,
                                    first_name: employee.name,
                                    profile_picture: employee.profile_picture,
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                          <DialogClose asChild>
                            {selectedEmployees.length ? (
                              <Button
                                variant="outline"
                                onClick={() => {
                                  form.trigger("team");
                                }}>
                                Select ({selectedEmployees.length})
                              </Button>
                            ) : (
                              <Button variant="ghost">Close</Button>
                            )}
                          </DialogClose>
                        </div>
                      </Command>
                    </DialogContent>
                  </Dialog>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!open && selectedEmployees.length ? (
              <div className="flex flex-wrap gap-2">
                {selectedEmployees.map((employee) => (
                  <div className="flex flex-wrap items-center gap-2 rounded-full border px-1.5 py-1">
                    <MemberAvatar
                      member={{
                        id: employee.id,
                        first_name: employee.name,
                        profile_picture: employee.profile_picture,
                      }}
                      className="m-0 size-6"
                    />
                    <span>{employee.name}</span>
                    <Icons.close
                      size={18}
                      className="cursor-pointer text-black"
                      onClick={() => handleSelectChange(employee)}
                    />
                  </div>
                ))}
              </div>
            ) : null}
            <div className="flex w-full justify-center">
              <Button disabled={isLoading} type="submit" className="w-full max-w-xs rounded-full">
                {isLoading ? <Icons.loader /> : "Create Event"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
