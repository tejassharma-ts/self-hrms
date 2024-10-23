import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface IBonusesAndDeductionsCardProps {
  heading: string;
  totalDeductions: number;
  bonus: number;
}

interface IPricingProps {
  heading: string;
  price: number;
}

const Pricing = ({ heading, price }: IPricingProps) => {
  const formatPrice = (price: number): string => {
    if (price >= 10000000) {
      const crores = (price / 10000000).toFixed(1);
      return `${crores} crore${Number(crores) !== 1 ? "s" : ""}`;
    }
    return price.toLocaleString("en-IN");
  };
  return (
    <div className={"flex flex-col gap-y-1"}>
      <h2 className={"whitespace-nowrap text-nowrap text-center text-lg"}>{heading}</h2>
      <p className={"whitespace-nowrap text-nowrap text-lg font-bold"}>Rs {formatPrice(price)}</p>
    </div>
  );
};

export const BonusesAndDeductionsCard = ({
  heading,
  totalDeductions,
  bonus,
}: IBonusesAndDeductionsCardProps) => {
  return (
    <Card className={cn("h-48 w-full max-w-md overflow-hidden border border-gray-200 shadow-lg")}>
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div>
          <h2 className="text-md font-semibold text-gray-400">{heading}</h2>
        </div>
        <div className={"flex items-center justify-between"}>
          <Pricing heading={"Total Bonus"} price={bonus} />
          <p className={"h-full bg-gray-200 px-[0.8px]"}></p>
          <Pricing heading={"Total Deductions"} price={totalDeductions} />
        </div>
      </CardContent>
    </Card>
  );
};
