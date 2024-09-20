"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { AlignJustify, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

export const HistoryTabs = ({ employeeId }: { employeeId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const currentView = searchParams.get("view");
  const currentAttendanceView = searchParams.get("view");

  const baseUrl = `/my-team/employee-profile/${employeeId}/?tab=history&category=`;
  const buttons = [
    { name: "Leaves", href: `${baseUrl}leaves` },
    { name: "Attendance", href: `${baseUrl}attendance&view=table` },
    { name: "Bonus", href: `${baseUrl}bonus` },
    { name: "Deduction", href: `${baseUrl}deduction` },
    { name: "Expense", href: `${baseUrl}expense` },
    { name: "Payroll", href: `${baseUrl}payroll` },
  ];

  const handleTabClick = (href: string) => {
    router.push(href);
  };

  const handleTableClick = () => {
    currentView != "table" && router.replace(`${baseUrl}attendance&view=table`);
  };

  const handleCalendarClick = () => {
    currentView != "calendar" && router.replace(`${baseUrl}attendance&view=calendar`);
  };

  return (
    <div className={"my-10 flex items-center justify-between"}>
      <div className={"flex gap-x-4"}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            className={`border bg-transparent ${
              currentCategory === button.href.split("category=")[1]
                ? "bg-black text-white"
                : "text-gray-400 hover:bg-transparent"
            }`}
            onClick={() => handleTabClick(button.href)}>
            {button.name}
          </Button>
        ))}
      </div>
      {currentCategory === "attendance" && (
        <div className={"flex items-center gap-x-4"}>
          <Button
            onClick={handleTableClick}
            className={cn(
              "bg-transparent text-black hover:bg-transparent",
              currentAttendanceView === "table" && "bg-black text-white",
            )}>
            <AlignJustify />
          </Button>
          <Button
            onClick={handleCalendarClick}
            className={cn(
              "bg-transparent text-black hover:bg-transparent",
              currentAttendanceView === "calendar" && "bg-black text-white",
            )}>
            <CalendarDays />
          </Button>
        </div>
      )}
    </div>
  );
};
