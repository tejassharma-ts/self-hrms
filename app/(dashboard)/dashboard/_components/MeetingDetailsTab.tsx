import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getFullbackName, getFullName } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/Icons";
import AddNewEvent from "../_modals/AddNewEvent";
import { apiCaller } from "@/lib/auth";
import { Meeting } from "@/types/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MeetingDetailsTab = ({
  selectedDate,
  className,
}: {
  selectedDate: any;
  className: string;
}): React.ReactNode => {
  return (
    <div className={className}>
      <Tabs defaultValue="meetings" className="relative mt-4 h-full w-full">
        <TabsList className="grid w-full grid-cols-3 gap-4">
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>
        <TabsContent value="meetings" className="">
          <Meetings selectedDate={selectedDate} />
        </TabsContent>
      </Tabs>
    </div>
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

    if (selectedDate) {
      getMeetings();
    }
  }, [selectedDate]);

  return isLoading ? (
    [...Array(2)].map((_, idx) => <MeetingSkeleton key={idx} />)
  ) : meetings.length === 0 ? (
    <div className="flex flex-col space-y-4">
      {selectedDate ? (
        <p className="my-2 text-center text-gray-500">
          There are no events for {format(parseISO(selectedDate), "yyyy MMM dd EEEE")}.
        </p>
      ) : (
        <p className="my-2 text-center text-gray-500">
          Please select a date from above to view all the meetings.
        </p>
      )}
      <AddNewEvent setMeetings={setMeetings} className="absolute bottom-0 w-full" />
    </div>
  ) : (
    <>
      <ScrollArea className="h-[300px]">
        {meetings.map((meeting) => (
          <Card className="mb-4 mr-4 border shadow-none last:mb-0">
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
      </ScrollArea>
      <AddNewEvent setMeetings={setMeetings} className="absolute bottom-0 w-full" />
    </>
  );
}

function MeetingSkeleton() {
  return (
    <>
      <Card className="mb-4 border shadow-none last:mb-0">
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
      {/* <Skeleton className="h-10 w-full rounded-full" /> */}
    </>
  );
}
