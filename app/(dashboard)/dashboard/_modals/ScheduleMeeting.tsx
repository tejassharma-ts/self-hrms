"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { CalendarIcon, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { api } from "@/api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock data for teams
const teams = [
  { id: "team1", name: "Marketing" },
  { id: "team2", name: "Development" },
  { id: "team3", name: "Design" },
  { id: "team4", name: "Sales" },
];

const eventSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  date: z.date(),
  team: z.array(z.string()),
  status: z.enum(["Ongoing", "Completed"]),
});

export default function ScheduleMeeting() {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      date: new Date(),
      team: ["f0d7f832-84a5-4163-b554-5052e6e0927e"],
      status: "Ongoing",
    },
  });
  const [selectedTeams, setSelectedTeams] = useState<{ id: string; name: string }[]>([]);

  const handleTeamSelect = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    if (team && !selectedTeams.some((t) => t.id === teamId)) {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const handleRemoveTeam = (teamId: string) => {
    setSelectedTeams(selectedTeams.filter((team) => team.id !== teamId));
  };

  async function onSubmit(values: z.infer<typeof eventSchema>) {
    try {
      const res = await api.post("/api/employees-app/event-meetings/", values);
      console.log(res);
    } catch (err) {
      console.log("err", err);
    }
  }

  console.log(form.formState.errors);
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
              name="link"
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
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
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <div className="space-y-2"> */}
              {/*   <Label htmlFor="time" className="text-sm font-medium"> */}
              {/*     Time */}
              {/*   </Label> */}
              {/*   <div className="relative"> */}
              {/*     <Input id="time" type="time" className="pl-10" /> */}
              {/*     <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /> */}
              {/*   </div> */}
              {/* </div> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="team" className="text-sm font-medium">
                Select Teams
              </Label>
              <Select onValueChange={handleTeamSelect}>
                <SelectTrigger id="team">
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedTeams.map((team) => (
                  <div
                    key={team.id}
                    className="flex items-center rounded-full bg-muted py-1 pl-1 pr-2 text-muted-foreground">
                    <Image
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${team.name}`}
                      alt={team.name}
                      width={24}
                      height={24}
                      className="mr-2 rounded-full"
                    />
                    <span className="text-sm">{team.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-5 w-5 p-0 text-muted-foreground"
                      onClick={() => handleRemoveTeam(team.id)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Ongoing">On Going</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded-full">
              Create Event
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
