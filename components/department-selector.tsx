import { useState } from "react";
import { apiCaller } from "@/lib/auth";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { Input } from "./ui/input";
import { Icons } from "./Icons";
import { Skeleton } from "./ui/skeleton";
import { useDebouncedCallback } from "use-debounce";
import { ScrollArea } from "./ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CommandLoading } from "cmdk";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Department {
  id: string;
  user: string;
  company: string;
  created_at: string;
  updated_at: string;
  depart_name: string;
}

interface DepartmentsResponse {
  departments: Department[];
  departments_count: number;
}

const debounceTime = 400;

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type DepartmentSelectorProps = {
  defaultValue?: string;
  onChange: (value: string) => void;
};
export default function DepartmentSelector({ defaultValue, onChange }: DepartmentSelectorProps) {
  const [open, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[] | []>([]);

  async function getDepartments(term?: string) {
    try {
      setIsLoading(true);
      const res = await apiCaller.get<DepartmentsResponse>("api/companies-app/api/department/", {
        params: {
          depart_name: term,
        },
      });
      setDepartments(res.data.departments);
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
            ? departments.find((department) => department.id === value)?.depart_name
            : defaultValue
              ? defaultValue
              : "Select department..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        <Command>
          <Input
            onChange={(e) => debouncedFetchDepartments(e.target.value)}
            placeholder="Search departments..."
          />
          <CommandList>
            {isLoading && <DepartmentSkeleton />}
            {/* <CommandGroup> */}
            {departments.map((department) => (
              <CommandItem
                key={department.id}
                value={department.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setIsOpen(false);
                  onChange(currentValue);
                }}>
                {/* <Check className={cn("mr-2 h-4 w-4")} /> */}
                {department.depart_name}
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
