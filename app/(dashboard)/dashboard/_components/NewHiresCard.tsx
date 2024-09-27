"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getFullName } from "@/lib/utils";
import { apiCaller } from "@/lib/auth";
import { format } from "date-fns";
import { YearMonthSelector } from "./YearMonthSelector";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewHiresCard() {
  const currentDate = new Date();
  const [newHires, setNewHires] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);

  useEffect(() => {
    async function getNewHires() {
      setIsLoading(true);
      try {
        const res = await apiCaller.get("/api/companies-app/company/newly-hired/", {
          params: {
            year: selectedYear,
            month: selectedMonth,
          },
        });
        setNewHires(res.data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getNewHires();
  }, [selectedMonth, selectedYear]);

  if (!newHires) {
    return <h1>Opps failed to fetch data</h1>;
  }

  return (
    <Card className="mx-auto h-48 w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 px-4">
        <CardTitle className="flex w-full items-center justify-between text-[21px] font-bold">
          <span>New Hires</span>
          <YearMonthSelector
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            setSelectedYear={setSelectedYear}
            setSelectedMonth={setSelectedMonth}
          />
          {/* <span className="text-xs">{format(new Date(), "MMMM, yyyy")}</span> */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <NewHiresSkeleton />}
        {!isLoading && newHires.length && (
          <ScrollArea className="h-28 w-full pr-4">
            {newHires.map((seeker: any) => (
              <div key={seeker.id} className="mb-4 flex items-center justify-between last:mb-0">
                <div className="flex flex-col space-y-0.5">
                  <h3 className="font-semibold">
                    {getFullName(seeker.first_name, seeker.last_name)}
                  </h3>
                  <p className="text-sm text-gray-500">{seeker.position}</p>
                </div>
                <div className="flex flex-col space-y-1 text-xs">
                  <span className="font-medium">Joined in</span>
                  <span>{format(new Date(seeker.date_joined), "MMMM do, yyyy")}</span>
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

function NewHiresSkeleton() {
  return (
    <div className="mb-4 flex animate-pulse items-center justify-between last:mb-0">
      <div className="flex flex-col space-y-0.5">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex flex-col space-y-1 text-xs">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
