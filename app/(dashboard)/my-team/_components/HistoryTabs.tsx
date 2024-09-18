"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export const HistoryTabs = ({ employeeId }: { employeeId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("category");

  const baseUrl = `/my-team/employee-profile/${employeeId}/?tab=history&category=`;
  const buttons = [
    { name: "Leaves", href: `${baseUrl}leaves` },
    { name: "Attendance", href: `${baseUrl}attendance` },
    { name: "Bonus", href: `${baseUrl}bonus` },
    { name: "Deduction", href: `${baseUrl}deduction` },
    { name: "Expense", href: `${baseUrl}expense` },
    { name: "Payroll", href: `${baseUrl}payroll` },
  ];

  const handleTabClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className={"my-10 flex w-[70%] items-center justify-between"}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          className={`border bg-transparent ${
            currentTab === button.href.split("category=")[1]
              ? "bg-black text-white"
              : "text-gray-400 hover:bg-transparent"
          }`}
          onClick={() => handleTabClick(button.href)}>
          {button.name}
        </Button>
      ))}
    </div>
  );
};
