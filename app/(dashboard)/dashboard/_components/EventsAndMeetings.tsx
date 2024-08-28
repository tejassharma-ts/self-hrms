import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, X } from "lucide-react";
import ScheduleMeeting from "../_modals/ScheduleMeeting";

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

export default function EventsAndMeetings() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
        <CardFooter>
          <Button variant="outline" className="w-full rounded-full text-sm" onClick={toggleModal}>
            <PlusCircle className="mr-2 h-3 w-3" />
            Add new Event
          </Button>
        </CardFooter>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={toggleModal}
            >
              <X className="h-5 w-5" />
            </button>
            <ScheduleMeeting />
          </div>
        </div>
      )}
    </>
  );
}
