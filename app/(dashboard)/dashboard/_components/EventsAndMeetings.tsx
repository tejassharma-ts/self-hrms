import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddNewEvent from "../_modals/AddNewEvent";
import { apiServer, getAuthHeader } from "@/lib/server/api";
import { Meeting } from "@/types/dashboard";
import { formatISOToTime } from "@/lib/utils";

async function getAllMeetings() {
  try {
    const res = await apiServer.get<Meeting[]>(
      "/api/employees-app/event-meetings/",
      getAuthHeader(),
    );
    return res.data;
  } catch (err) {
    console.log("err", err);
  }
}

export default async function EventsAndMeetings() {
  const meetings = await getAllMeetings();
  if (!meetings) {
    return (
      <div className="h-[407px] w-full max-w-md">
        <h1>Opps</h1>
      </div>
    );
  }

  return (
    <>
      <Card className="h-[407px] w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Events and Meetings</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter className="flex justify-center">
          <AddNewEvent />
        </CardFooter>
      </Card>
    </>
  );
}
