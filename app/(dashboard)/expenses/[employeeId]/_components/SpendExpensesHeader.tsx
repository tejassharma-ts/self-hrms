import React from "react";
import { SpendExpensesStatusFilter } from "@/app/(dashboard)/expenses/[employeeId]/_components/SpendExpensesStatusFilter";
import { Expenses } from "@/app/(dashboard)/expenses/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SpendExpensesHeaderProps {
  employeeSpendData: Expenses[];
  employeeId: string;
}

export const SpendExpensesHeader = ({
  employeeSpendData,
  employeeId,
}: SpendExpensesHeaderProps): React.ReactNode => {
  return (
    <>
      <div className={"mb-10 flex justify-between"}>
        <Card
          className={cn("h-36 w-full max-w-md overflow-hidden border border-gray-200 shadow-lg")}>
          <CardContent className="flex h-full gap-x-4 p-6">
            <Avatar className={"w-2/8 h-full"}>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className={"w-2/8 h-full"}>CN</AvatarFallback>
            </Avatar>
            <div className={"flex flex-col gap-y-1"}>
              <h2>
                {employeeSpendData[0]?.employee?.first_name}{" "}
                {employeeSpendData[0]?.employee?.last_name}
              </h2>
              <h3 className={"text-xs text-gray-400"}>Employee Id - {employeeId}</h3>
              <h3 className={"text-xs text-gray-400"}>
                Department - {employeeSpendData[0]?.employee?.department}
              </h3>
            </div>
          </CardContent>
        </Card>
        <div className={"col-span-1 mx-auto"}>
          <SpendExpensesStatusFilter />
        </div>
      </div>
    </>
  );
};