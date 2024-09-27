import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PencilLine } from "lucide-react";
import { cn } from "@/lib/utils";

interface IEachExpenseCardProps {
  heading: string;
  month?: string;
  isLast?: boolean;
}

export const ExpenseCard = ({ heading, month, isLast }: IEachExpenseCardProps): React.ReactNode => {
  return (
    <Card
      className={cn(
        "mx-auto h-48 w-full max-w-md overflow-hidden border border-gray-200 shadow-lg",
        isLast && "!border-black bg-black",
      )}>
      <CardContent className="flex h-full flex-col justify-between p-6">
        <h2 className="text-md font-semibold text-gray-400">{heading}</h2>
        {isLast ? (
          <div className={"flex items-center justify-between"}>
            <h2 className="mb-2 text-2xl font-bold text-white">{month || ""}</h2>
            <p className={"cursor-pointer text-white"}>
              <PencilLine />
            </p>
          </div>
        ) : (
          <h2 className="mb-2 text-2xl font-bold">{month || ""}</h2>
        )}
      </CardContent>
    </Card>
  );
};
