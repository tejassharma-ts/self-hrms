"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { History, Landmark, Phone, User, Wallet } from "lucide-react";

export const TabsCard = ({ employeeId }: { employeeId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const tabLinks = [
    {
      name: "Person Details",
      icon: <User />,
      href: `/my-team/employee-profile/${employeeId}/?tab=person-details`,
    },
    {
      name: "Contact Details",
      icon: <Phone />,
      href: `/my-team/employee-profile/${employeeId}/?tab=contact-details`,
    },
    {
      name: "Account Details",
      icon: <Landmark />,
      href: `/my-team/employee-profile/${employeeId}/?tab=account-details`,
    },
    {
      name: "Salary Details",
      icon: <Wallet />,
      href: `/my-team/employee-profile/${employeeId}/?tab=salary-details`,
    },
    {
      name: "History",
      icon: <History />,
      href: `/my-team/employee-profile/${employeeId}/?tab=history&category=leaves`,
    },
  ];

  const handleTabClick = (href: string) => {
    router.replace(href);
  };

  return (
    <Card
      className={
        "ml-4 mt-4 flex h-[17.5rem] w-[14.875rem] items-center justify-center rounded-3xl"
      }>
      <CardContent>
        <div className="flex flex-col items-start gap-y-6">
          {tabLinks.map((tab) => (
            <button
              onClick={() => handleTabClick(tab.href)}
              key={tab.name}
              className={`flex cursor-pointer items-center gap-x-2 text-nowrap text-sm font-bold ${
                currentTab === tab.href.split("=")[1]?.split("&")[0]
                  ? "text-black"
                  : "text-gray-500"
              } hover:text-black`}>
              <span>{tab.icon}</span>
              <p>{tab.name}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
