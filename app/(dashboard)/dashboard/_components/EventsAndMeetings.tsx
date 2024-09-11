import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddNewEvent from "../_modals/AddNewEvent";
import { getAuthCookies } from "@/lib/server/api";
import { Meeting } from "@/types/dashboard";
import { formatISOToTime } from "@/lib/utils";
import { apiCaller } from "@/lib/auth";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";

async function getAllMeetings() {
  try {
    const res = await apiCaller.get<Meeting[]>("/api/employees-app/event-meetings/", {
      headers: getAuthCookies(),
    });
    return res.data;
  } catch (err) {
    // console.log("err", err);
  }
}

export default async function EventsAndMeetings() {
  const meetings = await getAllMeetings();

  if (!meetings) {
    return (
      <EmptyPlaceholder className="mx-auto max-w-[800px]">
        {/* <EmptyPlaceholder.Icon name="warning" /> */}
        <EmptyPlaceholder.Title>Uh oh!</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>Can't fetch today's events</EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    );
  }

  return (
    <>
      <Card className="h-[407px] w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Events and Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          {meetings.length ? (
            <ScrollArea className="h-[230px] pr-4">
              {meetings.map((meeting, index) => (
                <div key={index} className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">{meeting.title}</h3>
                    <p className="text-xs text-muted-foreground">{meeting.description}</p>
                  </div>
                  <span className="text-xs font-medium">{formatISOToTime(meeting.date)}</span>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <EmptyPlaceholder className="min-h-auto">
              <EmptyPlaceholder.Title>Uh</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                There are not meetings for today
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <AddNewEvent />
        </CardFooter>
      </Card>
    </>
  );
}
