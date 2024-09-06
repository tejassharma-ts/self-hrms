import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EachTab } from "@/app/(dashboard)/dashboard/_components/EachTab";

export const MeetingDetailsTab = (): React.ReactNode => {
  return (
    <>
      <Tabs defaultValue="Meetings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Meetings">Meetings</TabsTrigger>
          <TabsTrigger value="Announcements">Announcements</TabsTrigger>
          <TabsTrigger value="Holidays">Holidays</TabsTrigger>
        </TabsList>
        <EachTab
          tab={"Meetings"}
          height={"32"}
          hoverHeight={"52"}
          cardTitle={"Meeting with Design Team"}
          buttonName={"Add Meeting"}
          CardContent={
            <CardContent className="absolute bottom-0 left-0 right-0 translate-y-full opacity-0 transition-all duration-300 ease-in-out last:translate-y-[40%] group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex items-center justify-between p-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, index) => (
                    <Avatar key={index} className="border-2 border-white">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="font-semibold text-[#998383]">10:00 AM</div>
              </div>
            </CardContent>
          }
        />
        <EachTab
          height={"24"}
          hoverHeight={"36"}
          tab={"Announcements"}
          cardTitle={"Welcome Announcements for new employees"}
          buttonName={"Create Announcement"}
          CardContent={
            <CardContent className="absolute left-0 right-0 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <div className="font-semibold text-[#998383]">10:00 AM</div>
            </CardContent>
          }
        />
      </Tabs>
    </>
  );
};
