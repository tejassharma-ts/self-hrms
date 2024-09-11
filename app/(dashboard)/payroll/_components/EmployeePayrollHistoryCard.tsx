"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";

interface IPayrollHeaderCardProps {
  heading: string;
}

export const EmployeePayrollHistoryCard = ({ heading }: IPayrollHeaderCardProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const handleViewClick = () => {
    router.replace(`${pathName}?payroll-history`);
  };

  return (
    <Card className={cn("col-span-2 h-48 w-full overflow-hidden border border-gray-200 shadow-lg")}>
      <CardContent className="flex h-full flex-col justify-between p-4">
        <div className={"flex items-center justify-between"}>
          <h2 className="text-md font-semibold">{heading}</h2>
          <div
            onClick={handleViewClick}
            className={
              "cursor-pointer rounded-full border border-black bg-transparent px-4 text-sm"
            }>
            View All
          </div>
        </div>
        <div>
          <div className="flex -space-x-4">
            {[...Array(4)].map((_, index) => (
              <Avatar key={index} className="h-16 w-16 border-2 border-white">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
