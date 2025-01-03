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
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NewHiresCard({ className }: { className: string }) {
  const currentDate = new Date();
  const [open, setOpen] = useState(false);
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
        setNewHires(res.data?.results || []);
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
    <Card className={cn("h-48 w-full overflow-hidden rounded-2xl", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-x-4 pb-2 pt-2">
        <CardTitle className="flex w-full items-center justify-between font-bold">
          New Hires
        </CardTitle>
        <YearMonthSelector
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-3 text-xl">List of new hires</DialogTitle>
              {newHires.length ? (
                <ScrollArea className="h-[350px]">
                  <div className="pr-4">
                    {newHires.map((seeker: any) => (
                      <div
                        key={seeker.id}
                        className="mb-4 flex items-center justify-between last:mb-0">
                        <div className="flex flex-col space-y-0.5">
                          <h3 className="font-normal">
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
                  </div>
                </ScrollArea>
              ) : (
                <h1 className="mt-2 text-lg font-medium text-gray-500">No new hires</h1>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="flex flex-col pt-0">
        {isLoading ? (
          <NewHiresSkeleton />
        ) : newHires.length === 0 ? (
          <h1 className="mt-2 text-lg font-medium text-gray-500">No new hires</h1>
        ) : (
          <ScrollArea type="always" className="h-[102px] w-full pr-4">
            <div className="flex flex-col justify-between gap-2">
              {newHires.map((seeker: any) => (
                <div
                  key={seeker.id}
                  className="tems-center grid grid-cols-3 justify-between border-b border-b-gray-100 pb-1 last:mb-0">
                  <div className="flex flex-col space-y-0.5">
                    <h3 className="text-sm font-medium">
                      {getFullName(seeker.first_name, seeker.last_name)}
                    </h3>
                  </div>
                  <div className="flex flex-col space-y-1 text-center text-sm">
                    <span>{format(new Date(seeker.date_joined), "M/d/yyyy")}</span>
                  </div>
                  <p className="text-right text-sm">{seeker.position}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        {newHires.length ? (
          <button
            onClick={() => setOpen(true)}
            className="ml-auto mr-4 text-sm underline opacity-50 hover:opacity-100">
            View all
          </button>
        ) : null}
        {/* <Button variant="outline" size="sm" className=""> */}
        {/* </Button> */}
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
