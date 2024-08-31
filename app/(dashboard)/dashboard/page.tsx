import WelcomeCard from "./_components/WecomeCard";
import NewHiresCard from "./_components/NewHiresCard";
import ValueCard from "./_components/ValueCard";
import PendingRequests from "./_components/PendingRequests";
import EmployeesOnLeave from "./_components/EmployeesOnLeave";
import EventsAndMeetings from "./_components/EventsAndMeetings";
import ProjectAnalytics from "./_components/ProjectAnalytics";
import Project from "./_components/Project";
import { Suspense } from "react";
import WelcomeCardSkeleton from "./_skeletons/WelcomeCardSkeleton";
import CheckedIn from "./_components/CheckedIn";
import AbsentMatrics from "./_components/AbsentMatrics";

type GridCardsProps = {
  searchParams: {
    projectName: string;
  };
};
export default function GridCards({ searchParams }: GridCardsProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-11 gap-4">
        <div className="col-span-3 mb-4">
          <Suspense fallback={<WelcomeCardSkeleton />}>
            <WelcomeCard />
          </Suspense>
        </div>
        <div className="col-span-2 mb-4">
          <CheckedIn />
        </div>
        <div className="col-span-2 mb-4">
          <AbsentMatrics />
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
          <Project name={searchParams.projectName || "frame-jar"} />
        </div>
      </div>
    </div>
  );
}
