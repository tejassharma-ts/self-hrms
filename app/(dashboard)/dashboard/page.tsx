'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import WelcomeCard from "./_components/WecomeCard"
import NewHiresCard from "./_components/NewHiresCard"
import ValueCard from "./_components/ValueCard"
import PendingRequests from "./_components/PendingRequests"
import EmployeesOnLeave from "./_components/EmployeesOnLeave"
import EventsAndMeetings from "./_components/EventsAndMeetings"
import ProjectAnalytics from "./_components/ProjectAnalytics"
import Project from "./_components/Project"


export default function GridCards() {
  return (
    <div className="container mx-auto pt-20 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-11 gap-2">
        <div className="col-span-3 mb-4">
          <WelcomeCard />
        </div>
        <div className="col-span-2 mb-4">
          <ValueCard key={1} value={200} title="Checked In" subtitle="Open/Closed" />
        </div>
        <div className="col-span-2 mb-4">
          <ValueCard key={2} value={40} title="Absent" subtitle="Not checked In + On Leave" />
        </div>
        <div className="col-span-4 mb-4">
          <NewHiresCard />
        </div>
        <div className="col-span-3 mb-4">
          <PendingRequests />
        </div>
        <div className="col-span-8 mb-4">
          <EmployeesOnLeave />
        </div>
        <div className="col-span-3 mb-4">
          <EventsAndMeetings />
        </div>
        <div className="col-span-5 mb-4">
          <ProjectAnalytics />
        </div>
        <div className="col-span-3 mb-4">
          <Project />
        </div>
      </div>
    </div>
  )
}