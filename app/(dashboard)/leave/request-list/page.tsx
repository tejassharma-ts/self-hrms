import { TabsWrapper } from "./_components/TabsWrapper";

type EmployeeRequestListPageProps = {
  searchParams: {
    tab: "leave-request" | "on-leave" | "calender";
    filter: "approved" | "denied" | "pending";
    department: "hr" | "design";
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
      activeDepartment={searchParams.department || "hr"}
      leaveRequestData={null}
      leaveBalanceData={null}
      employeeAvailabilityData={null}
      calendarData={null}
    />
  );
}
