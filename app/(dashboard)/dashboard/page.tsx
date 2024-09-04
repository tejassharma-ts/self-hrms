import { Suspense } from "react";
import WelcomeCard from "./_components/WecomeCard";
import NewHiresCard from "./_components/NewHiresCard";
import EventsAndMeetings from "./_components/EventsAndMeetings";
import ProjectAnalytics from "./_components/ProjectAnalytics";
import Project from "./_components/Project";
import NewHireSkeleton from "./_skeletons/NewHireSkeleton";
import EmployeeStatus from "./_components/EmployeeStatus";
import EmployeeStatusSkeleton from "./_skeletons/EmployeeStatusSkeleton";
import RequestWithEmployeeLeave from "./_components/RequestWithEmployeeLeave";
import RequestWithEmployeeLeaveSkeleton from "./_skeletons/RequestWithEmployeeLeaveSkeleton";
import ProjectAnalyticsSkeleton from "./_skeletons/ProjectAnalytics";

export default function GridCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-11">
      <div className="col-span-3 mb-4">
        <WelcomeCard />
      </div>
      <Suspense fallback={<EmployeeStatusSkeleton />}>
        <EmployeeStatus />
      </Suspense>
      <div className="col-span-4 mb-4">
        <Suspense fallback={<NewHireSkeleton />}>
          <NewHiresCard />
        </Suspense>
      </div>
      <Suspense fallback={<RequestWithEmployeeLeaveSkeleton />}>
        <RequestWithEmployeeLeave />
      </Suspense>
      <div className="col-span-3 mb-4">
        <EventsAndMeetings />
      </div>
      <div className="col-span-5 mb-4">
        <Suspense fallback={<ProjectAnalyticsSkeleton />}>
          <ProjectAnalytics />
        </Suspense>
      </div>
      <div className="col-span-3 mb-4">
        <Project />
      </div>
    </div>
  );
}
