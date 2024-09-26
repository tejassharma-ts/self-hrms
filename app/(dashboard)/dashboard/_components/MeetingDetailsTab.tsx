import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getFullbackName, getFullName } from "@/lib/utils";
import { formatISODate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import AddNewEvent from "../_modals/AddNewEvent";
import { apiCaller } from "@/lib/auth";
import { Meeting } from "@/types/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { getDisplayName } from "next/dist/shared/lib/utils";
import { toast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
// import { EachTab } from "@/app/(dashboard)/dashboard/_components/EachTab";

export const MeetingDetailsTab = ({ selectedDate }: { selectedDate: any }): React.ReactNode => {
  return (
    <Tabs defaultValue="meetings" className="mt-4 w-full">
      <TabsList className="grid w-full grid-cols-3 gap-4">
        <TabsTrigger value="meetings">Meetings</TabsTrigger>
        {/* <TabsTrigger value="announcements">Announcements</TabsTrigger> */}
        {/* <TabsTrigger value="holidays">Holidays</TabsTrigger> */}
      </TabsList>
      <TabsContent value="meetings" className="flex flex-col space-y-4">
        <Meetings selectedDate={selectedDate} />
      </TabsContent>
      {/* <TabsContent value="announcements">Change your password here.</TabsContent> */}
      {/* <TabsContent value="holidays">Change your password here.</TabsContent> */}
      {/* <EachTab */}
      {/*   tab={"Meetings"} */}
      {/*   height={8} */}
      {/*   hoverHeight={8} */}
      {/*   cardTitle={"Meeting with Design Team"} */}
      {/*   buttonName={"Add Meeting"} */}
      {/*   CardContent={ */}
      {/*     <CardContent className="absolute bottom-0 left-0 right-0 translate-y-full opacity-0 transition-all duration-300 ease-in-out last:translate-y-[40%] group-hover:translate-y-0 group-hover:opacity-100"> */}
      {/*       <div className="flex items-center justify-between p-4"> */}
      {/*         <div className="flex -space-x-2"> */}
      {/*           {[...Array(4)].map((_, index) => ( */}
      {/*             <Avatar key={index} className="border-2 border-white"> */}
      {/*               <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
      {/*               <AvatarFallback>CN</AvatarFallback> */}
      {/*             </Avatar> */}
      {/*           ))} */}
      {/*         </div> */}
      {/*         <div className="font-semibold text-[#998383]">10:00 AM</div> */}
      {/*       </div> */}
      {/*     </CardContent> */}
      {/*   } */}
      {/* /> */}
      {/* <EachTab */}
      {/*   height={6} */}
      {/*   hoverHeight={9} */}
      {/*   tab={"Announcements"} */}
      {/*   cardTitle={"Welcome Announcements for new employees"} */}
      {/*   buttonName={"Create Announcement"} */}
      {/*   CardContent={ */}
      {/*     <CardContent className="absolute left-0 right-0 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"> */}
      {/*       <div className="font-semibold text-[#998383]">10:00 AM</div> */}
      {/*     </CardContent> */}
      {/*   } */}
      {/* /> */}
    </Tabs>
  );
};

function Meetings({ selectedDate }: { selectedDate: any }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[] | []>([]);

  async function removeEvent(meetindID: string) {
    try {
      setIsDeleteLoading(true);
      await apiCaller.delete("/api/employees-app/event-meetings/", {
        params: {
          event_id: meetindID,
        },
      });
      const filteredEvents = meetings.filter((meeting) => meeting.id !== meetindID);
      setMeetings(filteredEvents);
    } catch (err) {
      toast({
        description: "Failed to remove events",
        variant: "destructive",
      });
    } finally {
      setIsDeleteLoading(false);
    }
  }

  useEffect(() => {
    async function getMeetings() {
      try {
        setIsLoading(true);
        const res = await apiCaller.get<Meeting[]>("/api/employees-app/event-meetings/", {
          params: {
            date: selectedDate === "" ? undefined : selectedDate,
          },
        });
        setMeetings(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getMeetings();
  }, [selectedDate]);

  return isLoading ? (
    [...Array(1)].map((_, idx) => <MeetingSkeleton key={idx} />)
  ) : meetings.length === 0 ? (
    <div className="flex flex-col space-y-4">
      <p className="my-2 text-center text-gray-500">
        There are no events for {format(parseISO(selectedDate), "EEEE")}.
      </p>
      <AddNewEvent setMeetings={setMeetings} />
    </div>
  ) : (
    <>
      {meetings.map((meeting) => (
        <Card className="border shadow-none">
          <CardContent className="p-4">
            <div key={meeting.id} className="flex flex-col space-y-6">
              <div className="flex items-center justify-between px-0">
                <div className="relative">
                  <h1 className="text-lg font-semibold">{meeting.title}</h1>
                  <p className="text-sm">{meeting.description}</p>
                  <a href={meeting.add_link} className="absolute inset-0" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Icons.option size={15} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="flex space-x-2 text-destructive"
                      onClick={() => removeEvent(meeting.id)}>
                      {isDeleteLoading && <Icons.loader />}
                      <span>Cancel</span>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="group flex items-center justify-between">
                <div className="group flex">
                  {meeting.team.map((member) => (
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar
                            key={member.id}
                            className="-ml-2 cursor-pointer border bg-white transition-all first:-ml-0 group-hover:ml-2 group-hover:first:ml-0">
                            <AvatarImage
                              src={member.profile_picture || "https://github.com/shadcn.png"}
                            />
                            <AvatarFallback>
                              {getFullbackName(member.first_name, member.last_name)}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{getFullName(member.first_name, member.last_name)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#998383]">10:00 am</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <AddNewEvent setMeetings={setMeetings} />
    </>
  );
}

function MeetingSkeleton() {
  return (
    <>
      <Card className="border shadow-none">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between px-0">
              <div>
                <Skeleton className="mb-2 h-6 w-40" />
                <Skeleton className="h-4 w-60" />
              </div>
              <Skeleton className="h-5 w-5" />
            </div>

            <div className="group flex items-center justify-between">
              <div className="group flex space-x-2">
                {[...Array(5)].map((_, idx) => (
                  <Skeleton key={idx} className="h-10 w-10 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Skeleton className="h-10 w-full rounded-full" />
    </>
  );
}
