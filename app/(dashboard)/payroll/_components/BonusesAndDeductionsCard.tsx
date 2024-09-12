import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface IBonusesAndDeductionsCardProps {
  heading: string;
}

interface IPricingProps {
  heading: string;
  price: number;
}

const Pricing = ({ heading, price }: IPricingProps) => {
  return (
    <div className={"flex flex-col gap-y-1"}>
      <h2 className={"text-center text-xs"}>{heading}</h2>
      <p className={"text-xl font-bold"}>Rs {price}</p>
    </div>
  );
};

export const BonusesAndDeductionsCard = ({ heading }: IBonusesAndDeductionsCardProps) => {
  return (
    <Card
      className={cn(
        "col-span-1 h-48 w-full max-w-md overflow-hidden border border-gray-200 shadow-lg",
      )}>
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div>
          <h2 className="text-md font-semibold text-gray-400">{heading}</h2>
        </div>
        <div className={"flex items-center justify-between"}>
          <Pricing heading={"Total Bonus"} price={287} />
          <p className={"h-full bg-gray-200 px-[0.8px]"}></p>
          <Pricing heading={"Total Deductions"} price={100} />
        </div>
      </CardContent>
    </Card>
  );
};
