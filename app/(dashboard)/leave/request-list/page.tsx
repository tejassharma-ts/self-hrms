import { Suspense } from "react";
import { TabsWrapper } from "./_components/TabsWrapper";

type EmployeeRequestListPageProps = {
  searchParams: {
    tab: string;
    filter: "approved" | "denied" | "pending";
  };
};
export default async function EmployeeRequestListPage({
  searchParams,
}: EmployeeRequestListPageProps) {
  // TODO: fetch all the neccessary data
  return (
    <TabsWrapper
      activeTab={searchParams.tab || "leave-request"}
      activeFilter={searchParams.filter || "approved"}
      leaveRequestData={null}
      leaveBalanceData={null}
      employeeAvailabilityData={null}
      calendarData={null}
    />
  );
}
