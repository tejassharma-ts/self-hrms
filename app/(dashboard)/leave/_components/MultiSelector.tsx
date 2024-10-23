import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

type MultiSelectorProps = {
  label: string;
  values: string[];
  handleSelectChange: (value: string) => void;
  isOptionSelected: (value: string) => boolean;
  onSearch: () => void;
};

export default function MultiSelector({
  label,
  values,
  handleSelectChange,
  isOptionSelected,
  onSearch,
}: MultiSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex gap-2">
            <span className="capitalize">{label}</span>
            <Icons.listFilter size={15} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
          <DropdownMenuLabel className="uppercase">{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {values.map((value, idx) => (
            <DropdownMenuCheckboxItem
              onSelect={(e) => e.preventDefault()}
              key={idx}
              checked={isOptionSelected(value)}
              onCheckedChange={() => handleSelectChange(value)}>
              {value}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <Button
            onClick={() => {
              setIsOpen(false);
              onSearch();
            }}
            className="w-full rounded-none"
            variant="ghost">
            Search results
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
