import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PencilLine } from "lucide-react";
import { cn } from "@/lib/utils";

interface IEachExpenseCardProps {
  heading: string;
  money: string;
  isLast?: boolean;
}

export const ExpenseCard = ({ heading, money, isLast }: IEachExpenseCardProps): React.ReactNode => {
  const integerPart: string = money.split(".")[0];
  const decimalPart: string = money.split(".")[1];

  return (
    <Card
      className={cn(
        "col-span-1 mx-auto h-48 w-full max-w-md overflow-hidden border border-gray-200 shadow-lg",
        isLast && "!border-black bg-black",
      )}>
      <CardContent className="flex h-full flex-col justify-between p-6">
        <h2 className="text-md font-semibold text-gray-400">{heading}</h2>
        {isLast ? (
          <div className={"flex items-center justify-between"}>
            <h2 className="mb-2 text-2xl font-bold text-white">
              {integerPart}
              <span className={"text-xl opacity-35"}>.{decimalPart ? decimalPart : "00"}</span>
            </h2>
            <p className={"cursor-pointer text-white"}>
              <PencilLine />
            </p>
          </div>
        ) : (
          <h2 className="mb-2 text-2xl font-bold">
            {integerPart}
            <span className={"text-xl opacity-35"}>.{decimalPart ? decimalPart : "00"}</span>
          </h2>
        )}
      </CardContent>
    </Card>
  );
};
