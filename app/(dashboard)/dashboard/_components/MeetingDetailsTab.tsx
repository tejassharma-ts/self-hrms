import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatTime, getFullbackName, getFullName } from "@/lib/utils";
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
import AddNewInterview from "../_modals/AddNewInterview";
import { UserAccount } from "@/types/auth";

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
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>
        <TabsContent value="meetings" className="">
          <Meetings selectedDate={selectedDate} />
        </TabsContent>
        <TabsContent value="interviews" className="">
          <Interviews selectedDate={selectedDate} />
        </TabsContent>
        <TabsContent value="announcements" className="">
          <Announcements selectedDate={selectedDate} />
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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-medium text-gray-500">
          <p>There are no events for {format(parseISO(selectedDate), "MMM dd EEEE")}.</p>
        </div>
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
                  <div className="group flex flex-1 items-center justify-between">
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
                    <span className="text-sm font-semibold text-[#998383]">
                      {format(meeting.date, "hh:mm:a")}
                    </span>
                  </div>
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

type EmployeeApplication = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  qualification: string;
  resume: string | null;
  status: string;
  meeting_link: string;
  address: string;
  gender: string;
  position_applied: string;
  previous_company_name: string;
  previous_salary: string;
  is_selected: string;
  interview_date: string;
  created_at: string;
  updated_at: string;
  company: string;
  department: string;
  user: string;
};

function Interviews({ selectedDate }: { selectedDate: any }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [interviews, setInterviews] = useState<EmployeeApplication[] | []>([]);

  async function removeEvent(meetindID: string) {
    return;
    try {
      setIsDeleteLoading(true);
      await apiCaller.delete("/api/employees-app/event-meetings/", {
        params: {
          event_id: meetindID,
        },
      });
      const filteredEvents = interviews.filter((meeting) => meeting.id !== meetindID);
      setInterviews(filteredEvents);
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
        const res = await apiCaller.get<EmployeeApplication[]>(
          "/api/companies-app/schedule-interview/",
          {
            params: {
              interview_date: selectedDate === "" ? undefined : selectedDate,
            },
          },
        );
        setInterviews(res.data);
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
  ) : interviews.length === 0 ? (
    <div className="flex flex-col space-y-4">
      {selectedDate ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-medium text-gray-500">
          <p>There are no events for {format(parseISO(selectedDate), "MMM dd EEEE")}.</p>
        </div>
      ) : (
        <p className="my-2 text-center text-gray-500">
          Please select a date from above to view all the meetings.
        </p>
      )}
      <AddNewInterview setMeetings={setInterviews} className="absolute bottom-0 w-full" />
    </div>
  ) : (
    <>
      <ScrollArea className="h-[300px]">
        {interviews.map((meeting) => (
          <Card className="mb-4 mr-4 border shadow-none last:mb-0">
            <CardContent className="p-4">
              <div key={meeting.id} className="flex flex-col space-y-6">
                <div className="flex items-center justify-between px-0">
                  <div className="relative">
                    <h1 className="text-lg font-semibold">
                      Interview with {getFullName(meeting.first_name, meeting.last_name)}
                    </h1>
                    <p className="text-sm text-gray-500">Role: {meeting.position_applied}</p>
                    <a href={meeting.meeting_link} className="absolute inset-0" />
                    <span className="text-sm font-semibold text-[#998383]">
                      {format(meeting.interview_date, "hh:mm:a")}
                    </span>
                  </div>
                  {/* <DropdownMenu> */}
                  {/*   <DropdownMenuTrigger> */}
                  {/*     <Icons.option size={15} /> */}
                  {/*   </DropdownMenuTrigger> */}
                  {/*   <DropdownMenuContent> */}
                  {/*     <DropdownMenuItem */}
                  {/*       className="flex space-x-2 text-destructive" */}
                  {/*       onClick={() => removeEvent(meeting.id)}> */}
                  {/*       {isDeleteLoading && <Icons.loader />} */}
                  {/*       <span>Cancel</span> */}
                  {/*     </DropdownMenuItem> */}
                  {/*     <DropdownMenuItem>Edit</DropdownMenuItem> */}
                  {/*   </DropdownMenuContent> */}
                  {/* </DropdownMenu> */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
      <AddNewInterview setMeetings={setInterviews} className="absolute bottom-0 w-full" />
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

type NotificationType = "Birthday" | "Anniversary" | "Meeting";

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  notification_type: NotificationType[];
}

function Announcements({ selectedDate }: { selectedDate: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [announcements, setAnnouncements] = useState<UserProfile[] | []>([]);

  useEffect(() => {
    async function getAnnouncements() {
      try {
        setIsLoading(true);
        const res = await apiCaller.get<UserProfile[]>(
          "/api/companies-app/api/today-notifications/",
          {
            params: {
              date: selectedDate === "" ? undefined : selectedDate,
            },
          },
        );
        console.log(res);
        setAnnouncements(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedDate) {
      getAnnouncements();
    }
  }, [selectedDate]);

  return isLoading ? (
    [...Array(2)].map((_, idx) => <MeetingSkeleton key={idx} />)
  ) : announcements.length === 0 ? (
    <div className="flex flex-col space-y-4">
      {selectedDate ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-medium text-gray-500">
          <p>There are no events for {format(parseISO(selectedDate), "MMM dd EEEE")}.</p>
        </div>
      ) : (
        <p className="my-2 text-center text-gray-500">
          Please select a date from above to view all the meetings.
        </p>
      )}
    </div>
  ) : (
    <>
      <ScrollArea className="h-[300px]">
        {announcements.map((ann) => (
          <Card className="mb-4 mr-4 border shadow-none last:mb-0">
            <CardContent className="p-4">
              <div key={ann.id} className="flex flex-col space-y-6">
                <div className="flex items-center justify-between px-0">
                  <div className="relative w-full">
                    <h1 className="text-lg font-semibold text-gray-500">{ann.notification_type}</h1>
                    <div className="flex w-full items-center justify-between">
                      <h1 className="text-lg font-semibold">
                        {getFullName(ann.first_name, ann.last_name)}
                      </h1>
                      <Avatar className="-ml-2 cursor-pointer border bg-white transition-all first:-ml-0 group-hover:ml-2 group-hover:first:ml-0">
                        <AvatarImage src={ann.profile_picture || "https://github.com/shadcn.png"} />
                        <AvatarFallback>
                          {getFullName(ann.first_name, ann.last_name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </>
  );
}
