import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IEachExpenseCardProps {
  heading: string;
  month: string;
  year: number;
}

export const PayrollHeaderCard = ({
  heading,
  month,
  year,
}: IEachExpenseCardProps): React.ReactNode => {
  return (
    <Card
      className={cn(
        "mx-auto h-48 w-full max-w-md overflow-hidden border border-gray-200 shadow-lg",
      )}>
      <CardContent className="flex h-full flex-col justify-between p-6">
        <h2 className="text-md font-semibold text-gray-400">{heading}</h2>
        <h2 className="mb-2 text-xl font-bold">
          {month || ""}, <span className={"text-lg opacity-35"}>{year}</span>
        </h2>
      </CardContent>
    </Card>
  );
};
