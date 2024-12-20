import { useState } from "react";
import { apiCaller } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebouncedCallback } from "use-debounce";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { getFullbackName } from "@/lib/utils";

interface User {
  id: string; // Unique identifier for the user
  name: string; // Full name of the user
  profile_picture: string; // URL to the user's profile picture
  department: string; // Department where the user works
}

const debounceTime = 400;

type DepartmentSelectorProps = {
  defaultValue?: string;
  onChange: (value: string) => void;
};
export default function EmployeeSelector({ defaultValue, onChange }: DepartmentSelectorProps) {
  const [open, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState<User[] | []>([]);

  async function getDepartments(term?: string) {
    try {
      setIsLoading(true);
      const res = await apiCaller.get<User[]>("api/employees-app/employees-search/", {
        params: {
          search: term,
        },
      });
      setDepartments(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  const [value, setValue] = useState("");

  const debouncedFetchDepartments = useDebouncedCallback(getDepartments, debounceTime);

  useEffect(() => {
    if (open) {
      getDepartments();
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setIsOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex w-full justify-between rounded-md">
          {value
            ? departments.find((department) => department.id === value)?.name
            : defaultValue
              ? defaultValue
              : "Search Employee..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-96 p-0">
        <Command>
          <Input
            onChange={(e) => debouncedFetchDepartments(e.target.value)}
            placeholder="Search..."
          />
          <CommandList>
            {isLoading && <DepartmentSkeleton />}
            {/* <CommandGroup> */}
            {departments.map((department) => (
              <CommandItem
                key={department.id}
                className="flex gap-2 py-2"
                value={department.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setIsOpen(false);
                  onChange(currentValue);
                }}>
                <Avatar>
                  <AvatarImage
                    src={department.profile_picture || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>{department.name}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>{department.name}</span>
                  <span>{department.department}</span>
                </div>
              </CommandItem>
            ))}
            {/* </CommandGroup> */}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function DepartmentSkeleton() {
  return [...Array(10)].map((_, index) => (
    <Skeleton key={index} className="mb-2 h-6 rounded"></Skeleton>
  ));
}
