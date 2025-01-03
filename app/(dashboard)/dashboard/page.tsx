import WelcomeCard from "./_components/WecomeCard";
import NewHiresCard from "./_components/NewHiresCard";
import EmployeeStatus from "./_components/EmployeeStatus";
import RequestWithEmployeeLeave from "./_components/RequestWithEmployeeLeave";
import PreviousPayrollCard from "./_components/PreviousPayrollCard";
import MeetingCard from "@/app/(dashboard)/dashboard/_components/MeetingCard";
import EmployeesOnLeave from "./_components/EmployeesOnLeave";

export const dynamic = "force-dynamic";

export default function GridCards() {
  return (
    <div className="mt-4">
      <div className="grid min-h-screen grid-cols-12 grid-rows-[200px_180px_1fr] gap-4">
        <WelcomeCard className="col-span-3" />
        <EmployeeStatus className="col-span-2" />
        <NewHiresCard className="col-span-5" />
        <RequestWithEmployeeLeave className="col-span-4" />
        <PreviousPayrollCard className="col-span-4" />
        <MeetingCard className="col-span-4 row-span-3" />
        <EmployeesOnLeave className="col-span-8 row-span-3" />
      </div>
    </div>
  );
}
