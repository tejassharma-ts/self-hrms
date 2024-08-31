"use client";

import { useState } from "react";
import { CalendarIcon, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const [focusedInput, setFocusedInput] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedHeads, setSelectedHeads] = useState<
    { id: string; name: string }[]
  >([]);

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput("");
  };

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

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Icons.add className="size-4 mr-2" />
          Add new Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="projectTitle"
                    className={`text-sm font-medium ${
                      focusedInput === "projectTitle"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    Project Title
                  </Label>
                  <input
                    id="projectTitle"
                    type="text"
                    className={`w-full bg-transparent border-b border-input px-3 py-2 text-sm focus:outline-none ${
                      focusedInput === "projectTitle" ? "border-primary" : ""
                    }`}
                    onFocus={() => handleFocus("projectTitle")}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="description"
                    className={`text-sm font-medium ${
                      focusedInput === "description"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    className={`w-full bg-transparent border-b border-input px-3 py-2 text-sm focus:outline-none ${
                      focusedInput === "description" ? "border-primary" : ""
                    }`}
                    onFocus={() => handleFocus("description")}
                    onBlur={handleBlur}
                  />
                </div>
                {["title", "link"].map((inputName) => (
                  <div key={inputName}>
                    <Label
                      htmlFor={inputName}
                      className={`text-sm font-medium ${
                        focusedInput === inputName
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {inputName.charAt(0).toUpperCase() + inputName.slice(1)}
                    </Label>
                    <input
                      id={inputName}
                      type={inputName === "link" ? "url" : "text"}
                      className={`w-full bg-transparent border-b border-input px-3 py-2 text-sm focus:outline-none ${
                        focusedInput === inputName ? "border-primary" : ""
                      }`}
                      onFocus={() => handleFocus(inputName)}
                      onBlur={handleBlur}
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium">
                    Date
                  </Label>
                  <div className="relative">
                    <Input id="date" type="date" className="pl-10" />
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium">
                    Time
                  </Label>
                  <div className="relative">
                    <Input id="time" type="time" className="pl-10" />
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTeams.map((team) => (
                    <div
                      key={team.id}
                      className="flex items-center bg-muted text-muted-foreground rounded-full pl-1 pr-2 py-1"
                    >
                      <Image
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${team.name}`}
                        alt={team.name}
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                      />
                      <span className="text-sm">{team.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-5 w-5 p-0 text-muted-foreground"
                        onClick={() => handleRemoveTeam(team.id)}
                      >
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedHeads.map((head) => (
                    <div
                      key={head.id}
                      className="flex items-center bg-muted text-muted-foreground rounded-full pl-1 pr-2 py-1"
                    >
                      <Image
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${head.name}`}
                        alt={head.name}
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                      />
                      <span className="text-sm">{head.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-5 w-5 p-0 text-muted-foreground"
                        onClick={() => handleRemoveHead(head.id)}
                      >
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
          </Card>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
