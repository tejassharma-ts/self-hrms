"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MeetingDetailsTab } from "@/app/(dashboard)/dashboard/_components/MeetingDetailsTab";

const calendarCarousel: { day: string; date: string }[] = [
  { day: "MON", date: "2" },
  { day: "TUE", date: "3" },
  { day: "WED", date: "4" },
  { day: "THU", date: "5" },
  { day: "FRI", date: "6" },
  { day: "SAT", date: "7" },
];

const MeetingCard = (): React.ReactNode => {
  const currentDate: string = "4";

  return (
    <>
      <div className="relative w-[40rem] rounded-xl border border-black p-6">
        <div className="inset-0 flex flex-col p-6">
          <h1 className="border-b border-b-slate-400 pb-2 text-center text-2xl font-bold">
            September 2024
          </h1>
          <div className="mt-4">
            <Carousel className="mb-10 w-full">
              <CarouselPrevious className="-left-5" />
              <CarouselNext className="-right-5" />
              <CarouselContent className="mx-2 flex items-center text-center">
                {calendarCarousel.map((eachDay, index) => (
                  <CarouselItem key={index} className="p-0 lg:basis-1/6">
                    <div className="p-1">
                      <Card
                        className={cn(
                          "inline-flex w-16 justify-center",
                          currentDate === eachDay.date && "bg-black",
                        )}>
                        <CardContent
                          className={cn(
                            "flex flex-col items-center justify-between p-4 text-gray-500",
                            currentDate === eachDay.date && "text-white",
                          )}>
                          <p className="text-sm font-semibold">{eachDay.day}</p>
                          <p className="mt-2 text-sm font-semibold">{eachDay.date}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <MeetingDetailsTab />
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingCard;
