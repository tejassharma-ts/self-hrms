import React, { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

interface EachTabProps {
  height: number;
  hoverHeight: number;
  tab: string;
  cardTitle: string;
  buttonName: string;
  CardContent: any;
  description?: string;
}

export const EachTab = ({
  tab,
  cardTitle,
  buttonName,
  CardContent,
  description,
  height,
  hoverHeight,
}: EachTabProps): React.ReactNode => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [dropdownOpenCard, setDropdownOpenCard] = useState<number | null>(null);

  const handleMouseEnter = (index: number): void => {
    setExpandedCard(index);
  };

  const handleMouseLeave = (index: number): void => {
    if (dropdownOpenCard !== index) {
      setExpandedCard(null);
    }
  };

  const handleDropdownOpen = (index: number): void => {
    setDropdownOpenCard(index);
    setExpandedCard(index);
  };

  const handleDropdownClose = (): void => {
    setDropdownOpenCard(null);
  };
  return (
    <TabsContent value={tab}>
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className={cn(
            `group relative my-4 transition-all duration-300 ease-in-out hover:min-h-[${hoverHeight}rem]`,
          )}
          style={{
            minHeight: expandedCard === index ? `${hoverHeight}rem` : `${height}rem`,
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-2">
              <CardTitle
                className={"text-gray-400 transition-all duration-300 group-hover:text-black"}>
                {cardTitle}
              </CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            <div className="group/edit relative">
              <DropdownMenu
                onOpenChange={(open) => {
                  if (open) handleDropdownOpen(index);
                  else handleDropdownClose();
                }}>
                <DropdownMenuTrigger className="focus:outline-none">
                  <EllipsisVertical
                    className="cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
                    color="#C5C6D0"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="text-red-500">
                    {tab === "Meetings" ? "Cancel" : "Delete"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          {CardContent}
        </Card>
      ))}
      <div className={"mt-10 flex justify-center"}>
        <Button
          className={"rounded-full border border-black bg-transparent text-black hover:text-white"}>
          +{buttonName}
        </Button>
      </div>
    </TabsContent>
  );
};
