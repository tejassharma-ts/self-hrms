"use client";

import { cn, combineDateAndTime } from "@/lib/utils";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/Icons";
import { apiCaller } from "@/lib/auth";
import MultipleSelector from "@/components/ui/multi-select";
import { toast } from "@/hooks/use-toast";

type Employee = {
  id: string;
  name: string;
  profile_picture: string;
  department: string;
  label: string;
  value: string;
};

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  add_link: z.string().url({ message: "Please enter a valid URL for the link." }),
  date: z.date({ invalid_type_error: "Please enter a valid date." }),
  team: z.any().array().nonempty({ message: "Team member name cannot be empty." }),
  // status: z.enum(["Ongoing", "Completed", "Scheduled"], {
  //   errorMap: () => ({ message: "Status must be either 'Ongoing' or 'Completed'." }),
  // }),
  time: z.string(),
});

export default function ScheduleMeeting({
  setShowDialog,
  setMeetings,
}: {
  setShowDialog: any;
  setMeetings: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "This is example",
      description: "This is example",
      add_link: "http://localhost:3000/dashboard",
      date: undefined,
      time: undefined,
      team: [],
    },
  });

  async function onSubmit(values: z.infer<typeof eventSchema>) {
    try {
      const teamIDs = values.team.map((team) => team.id);
      setIsLoading(true);
      const res = await apiCaller.post("/api/employees-app/event-meetings/", {
        ...values,
        date: combineDateAndTime(values.date, values.time),
        status: "Scheduled",
        team: teamIDs,
      });

      if (format(res.data.date, "yyy MM dd") === format(values.date, "yyyy MM dd")) {
        setMeetings((pre: any) => [...pre, res.data]);
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
      const res = await apiCaller.get("/api/employees-app/employees-search/", {
        params: {
          search: value,
        },
      });

      const employees = res.data.map((employee: Employee) => ({
        ...employee,
        label: employee.name,
        value: employee.name,
      }));

      return employees;
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <div className="mx-auto mt-4 w-full">
      <div className="flex flex-col space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Textarea className="resize-none" {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover modal>
                      <PopoverTrigger asChild>
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
                      <Input type="time" {...field} />
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
                  <FormControl>
                    <MultipleSelector
                      onChange={field.onChange}
                      onSearch={onSearchHandler}
                      placeholder="Add team member"
                      delay={1000}
                      loadingIndicator={
                        <div className="h-20 py-2">
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Icons.loader />
                          </div>
                        </div>
                      }
                      emptyIndicator={
                        <p className="w-full text-center text-sm text-muted-foreground">
                          No Team member found
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className="space-y-2"> */}
            {/*   <Label htmlFor="team" className="text-sm font-medium"> */}
            {/*     Select Teams */}
            {/*   </Label> */}
            {/*   <Select onValueChange={handleTeamSelect}> */}
            {/*     <SelectTrigger id="team"> */}
            {/*       <SelectValue placeholder="Select a team" /> */}
            {/*     </SelectTrigger> */}
            {/*     <SelectContent> */}
            {/*       {teams.map((team) => ( */}
            {/*         <SelectItem key={team.id} value={team.id}> */}
            {/*           {team.name} */}
            {/*         </SelectItem> */}
            {/*       ))} */}
            {/*     </SelectContent> */}
            {/*   </Select> */}
            {/*   <div className="mt-2 flex flex-wrap gap-2"> */}
            {/*     {selectedTeams.map((team) => ( */}
            {/*       <div */}
            {/*         key={team.id} */}
            {/*         className="flex items-center rounded-full bg-muted py-1 pl-1 pr-2 text-muted-foreground"> */}
            {/*         <Image */}
            {/*           src={`https://api.dicebear.com/6.x/initials/svg?seed=${team.name}`} */}
            {/*           alt={team.name} */}
            {/*           width={24} */}
            {/*           height={24} */}
            {/*           className="mr-2 rounded-full" */}
            {/*         /> */}
            {/*         <span className="text-sm">{team.name}</span> */}
            {/*         <Button */}
            {/*           variant="ghost" */}
            {/*           size="sm" */}
            {/*           className="ml-1 h-5 w-5 p-0 text-muted-foreground" */}
            {/*           onClick={() => handleRemoveTeam(team.id)}> */}
            {/*           <X className="h-3 w-3" /> */}
            {/*         </Button> */}
            {/*       </div> */}
            {/*     ))} */}
            {/*   </div> */}
            {/* </div> */}
            {/* <FormField */}
            {/*   control={form.control} */}
            {/*   name="status" */}
            {/*   render={({ field }) => ( */}
            {/*     <FormItem> */}
            {/*       <FormLabel>Status</FormLabel> */}
            {/*       <Select onValueChange={field.onChange} defaultValue={field.value}> */}
            {/*         <FormControl> */}
            {/*           <SelectTrigger> */}
            {/*             <SelectValue placeholder="Select a verified email to display" /> */}
            {/*           </SelectTrigger> */}
            {/*         </FormControl> */}
            {/*         <SelectContent> */}
            {/*           <SelectItem value="Ongoing">On Going</SelectItem> */}
            {/*           <SelectItem value="Completed">Completed</SelectItem> */}
            {/*           <SelectItem value="Scheduled">Scheduled</SelectItem> */}
            {/*         </SelectContent> */}
            {/*       </Select> */}
            {/*       <FormMessage /> */}
            {/*     </FormItem> */}
            {/*   )} */}
            {/* /> */}
            <Button type="submit" className="w-full rounded-full">
              {isLoading ? <Icons.loader /> : "Create Event"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
