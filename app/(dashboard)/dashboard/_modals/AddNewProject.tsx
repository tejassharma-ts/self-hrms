"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { CalendarIcon, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { api } from "@/api/api";

const projectSchema = z.object({
  project_name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  start_date: z.date(),
  end_date: z.date(),
  status: z.enum(["Ongoing", "Completed"]),
  assigned_employees: z.array(z.string().uuid("Invalid employee ID")),
  completion_percentage: z.string().refine(
    (val) => {
      const num = Number(val);
      return num >= 0 && num <= 100;
    },
    {
      message: "Completion percentage must be between 0 and 100",
    },
  ),
});

// Mock data for teams and project heads
const teams = [
  { id: "team1", name: "Marketing" },
  { id: "team2", name: "Development" },
  { id: "team3", name: "Design" },
  { id: "team4", name: "Sales" },
];

const projectHeads = [
  { id: "head1", name: "Alice Johnson" },
  { id: "head2", name: "Bob Smith" },
  { id: "head3", name: "Carol White" },
  { id: "head4", name: "Dave Brown" },
];

export default function AddNewProject() {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      project_name: "Customer Feedback System",
      description:
        "Implementing a system to collect and analyze customer feedback for product improvements.",
      start_date: undefined,
      end_date: undefined,
      status: "Ongoing",
      assigned_employees: [
        "f0d7f832-84a5-4163-b554-5052e6e0927e",
        "c2d14431-c352-4d75-9026-d211bbd852a9",
      ],
      completion_percentage: "60",
    },
  });
  const [selectedTeams, setSelectedTeams] = useState<{ id: string; name: string }[]>([]);
  const [selectedHeads, setSelectedHeads] = useState<{ id: string; name: string }[]>([]);

  const handleTeamSelect = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    if (team && !selectedTeams.some((t) => t.id === teamId)) {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const handleRemoveTeam = (teamId: string) => {
    setSelectedTeams(selectedTeams.filter((team) => team.id !== teamId));
  };

  const handleHeadSelect = (headId: string) => {
    const head = projectHeads.find((h) => h.id === headId);
    if (head && !selectedHeads.some((h) => h.id === headId)) {
      setSelectedHeads([...selectedHeads, head]);
    }
  };

  const handleRemoveHead = (headId: string) => {
    setSelectedHeads(selectedHeads.filter((head) => head.id !== headId));
  };

  async function onSubmit(values: z.infer<typeof projectSchema>) {
    try {
      // TODO: remove hard coded value
      const res = await api.post(
        "/api/project_management/projects/create/?company=f619fb18-cbbb-411b-a55c-ea85320cd2fd",
      );
      console.log(res);
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Icons.add className="mr-2 size-4" />
          Add new Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Card className="mx-auto w-full max-w-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardHeader className="p-0">
                  <CardTitle>Add New Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-0">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="project_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title</FormLabel>
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
                            <Textarea
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between space-x-4">
                      <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col w-full">
                            <FormLabel>Start Date</FormLabel>
                            <Popover modal>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}>
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a starting date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                  }
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
                        name="end_date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col w-full">
                            <FormLabel>End Date</FormLabel>
                            <Popover modal>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}>
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a ending date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                  <div className="space-y-2">
                    <Label htmlFor="projectHeads" className="text-sm font-medium">
                      Project Heads
                    </Label>
                    <Select onValueChange={handleHeadSelect}>
                      <SelectTrigger id="projectHeads">
                        <SelectValue placeholder="Select project heads" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectHeads.map((head) => (
                          <SelectItem key={head.id} value={head.id}>
                            {head.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedHeads.map((head) => (
                        <div
                          key={head.id}
                          className="flex items-center rounded-full bg-muted py-1 pl-1 pr-2 text-muted-foreground">
                          <Image
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${head.name}`}
                            alt={head.name}
                            width={24}
                            height={24}
                            className="mr-2 rounded-full"
                          />
                          <span className="text-sm">{head.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-5 w-5 p-0 text-muted-foreground"
                            onClick={() => handleRemoveHead(head.id)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full">Add Project</Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
