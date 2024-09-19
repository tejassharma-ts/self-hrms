"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Payroll } from "@/types/types";

interface IPayrollHeaderCardProps {
  heading: string;
  payrollData: Payroll[];
}

export const EmployeePayrollHistoryCard = ({ heading, payrollData }: IPayrollHeaderCardProps) => {
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
            {payrollData.slice(0, 4).map((eachPayrollData) => (
              <Link
                key={eachPayrollData.id}
                href={`/payroll/history/?id=${eachPayrollData.employee.id}`}>
                <Avatar className="h-16 w-16 border-2 border-white">
                  <AvatarImage src={`${eachPayrollData.employee.profile_picture}`} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
