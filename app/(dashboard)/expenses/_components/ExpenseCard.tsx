import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IEachExpenseCardProps {
  heading: string;
  money: string;
  isLast?: boolean;
}

export const ExpenseCard = ({ heading, money, isLast }: IEachExpenseCardProps): React.ReactNode => {
  return (
    <Card
      className={cn(
        "col-span-1 mx-auto h-48 w-full max-w-md overflow-hidden border border-gray-200 shadow-lg",
        isLast && "!border-black bg-black",
      )}>
      <CardContent className="flex h-full flex-col justify-between p-6">
        <h2 className="text-md font-semibold text-gray-400">{heading}</h2>
        <h2 className={cn("mb-2 text-xl font-bold", isLast && "text-white")}>
          Rs. {money.length > 7 ? money.slice(0, 1) + "." + money.slice(1, 3) + "" + "Cr" : money}
        </h2>
      </CardContent>
    </Card>
  );
};
