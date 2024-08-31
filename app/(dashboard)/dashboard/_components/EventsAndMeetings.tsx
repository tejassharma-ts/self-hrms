import { delay } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, X } from "lucide-react";
import ScheduleMeeting from "../_modals/ScheduleMeeting";
import AddNewEvent from "../_modals/AddNewEvent";

// Mock data for events and meetings
const events = [
  { title: "Team Meeting", subtitle: "Weekly Sync", time: "10:00 AM" },
  { title: "Client Presentation", subtitle: "Project X", time: "2:00 PM" },
  { title: "Lunch with Colleagues", subtitle: "Team Building", time: "12:30 PM" },
  { title: "Product Demo", subtitle: "New Features", time: "4:00 PM" },
  { title: "1-on-1 with Manager", subtitle: "Performance Review", time: "11:00 AM" },
  { title: "Workshop", subtitle: "Agile Methodologies", time: "3:00 PM" },
  { title: "Networking Event", subtitle: "Industry Meetup", time: "6:00 PM" },
];

export default async function EventsAndMeetings() {
  // fetch all the events and  meetings
  // await delay(2000);

  return (
    <>
      <Card className="w-full h-[407px] max-w-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Events and Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[230px] pr-4">
            {events.map((event, index) => (
              <div key={index} className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">{event.title}</h3>
                  <p className="text-xs text-muted-foreground">{event.subtitle}</p>
                </div>
                <span className="text-xs font-medium">{event.time}</span>
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
