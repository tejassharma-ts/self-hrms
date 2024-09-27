import React from "react";
import { BonusesAndDeductionsCard } from "../_components/BonusesAndDeductionsCard";
import { PencilLine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getMonthNameFromNumber } from "@/lib/utils";

export const PayrollOverviewHeader = ({
  totalDeductions,
  bonus,
}: {
  totalDeductions: number;
  bonus: number;
}): React.ReactNode => {
  const currentDate = new Date().getDate();
  const currentMonthNumber = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthName = getMonthNameFromNumber(currentMonthNumber);
  return (
    <>
      <div className={"mb-10 flex max-w-screen-lg justify-between gap-x-4"}>
        <Card
          className={
            "mx-auto h-48 w-full max-w-xl overflow-hidden border !border-black bg-black shadow-lg"
          }>
          <CardContent className="flex h-full flex-col justify-between p-6">
            <div className={"flex items-center gap-x-2"}>
              <h2 className="text-md font-semibold text-gray-400">This Month's Payroll</h2>
              <span className={"cursor-pointer text-white"}>
                <PencilLine />
              </span>
            </div>

            <h2 className="mb-2 text-xl font-bold text-white">
              {currentMonthName} {currentDate} ,{" "}
              <span className={"text-lg opacity-35"}>{currentYear}</span>
            </h2>
          </CardContent>
        </Card>
        <BonusesAndDeductionsCard
          bonus={bonus}
          totalDeductions={totalDeductions}
          heading={"Bonuses & Deductions"}
        />
      </div>
    </>
  );
};
