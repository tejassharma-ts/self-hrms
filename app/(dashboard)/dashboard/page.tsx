import { Suspense } from "react";
import WelcomeCard from "./_components/WecomeCard";
import NewHiresCard from "./_components/NewHiresCard";
// import EventsAndMeetings from "./_components/EventsAndMeetings";
// import ProjectAnalytics from "./_components/ProjectAnalytics";
// import Project from "./_components/Project";
import NewHireSkeleton from "./_skeletons/NewHireSkeleton";
import EmployeeStatus from "./_components/EmployeeStatus";
import EmployeeStatusSkeleton from "./_skeletons/EmployeeStatusSkeleton";
import RequestWithEmployeeLeave from "./_components/RequestWithEmployeeLeave";
import PreviousPayrollCard from "./_components/PreviousPayrollCard";
import RequestWithEmployeeLeaveSkeleton from "./_skeletons/RequestWithEmployeeLeaveSkeleton";
// import ProjectAnalyticsSkeleton from "./_skeletons/ProjectAnalytics";
import MeetingCard from "@/app/(dashboard)/dashboard/_components/MeetingCard";
import EmployeesOnLeave from "./_components/EmployeesOnLeave";

export const dynamic = "force-dynamic";

export default function GridCards() {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-12 grid-rows-[200px_180px_1fr] gap-4 min-h-screen">
        <WelcomeCard className="col-span-3" />
        <EmployeeStatus className="col-span-2" />
        <NewHiresCard className="col-span-5" />
        <RequestWithEmployeeLeave className="col-span-4" />
        <PreviousPayrollCard className="col-span-4" />
        <MeetingCard className="col-span-4 row-span-3" />
        <EmployeesOnLeave className="col-span-8 row-span-3" />
      </div>
      {/* <div className="mb-4"> */}
      {/* </div> */}
      {/* <EventsAndMeetings /> */}
      {/* <div className="col-span-5 mb-4"> */}
      {/*   <Suspense fallback={<ProjectAnalyticsSkeleton />}> */}
      {/*     <ProjectAnalytics /> */}
      {/*   </Suspense> */}
      {/* </div> */}
      {/* <div className="col-span-3 mb-4"> */}
      {/*   <Project /> */}
      {/* </div> */}
    </div>
  );
}
