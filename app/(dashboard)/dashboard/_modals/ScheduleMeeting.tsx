"use client";

import { useState } from "react";
import { CalendarIcon, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

// Mock data for teams
const teams = [
  { id: "team1", name: "Marketing" },
  { id: "team2", name: "Development" },
  { id: "team3", name: "Design" },
  { id: "team4", name: "Sales" },
];

export default function ScheduleMeeting() {
  const [focusedInput, setFocusedInput] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<
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

  return (
    <div className="w-full mx-auto mt-4">
      <div className="flex flex-col space-y-8">
        {["title", "description", "link"].map((inputName) => (
          <div key={inputName}>
            <Label
              htmlFor={inputName}
              className={`text-sm font-semibold ${
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
        <Button className="w-full rounded-full">Create Event</Button>
      </div>
    </div>
  );
}

