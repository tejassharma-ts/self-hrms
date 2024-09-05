import { TabsWrapper } from "./_components/TabsWrapper";
import { apiServer, getAuthCookies } from "@/lib/server/api";
import { LeavesDataApi } from "@/types/dashboard";

type Filter = "approved" | "denied" | "pending";
type EmployeeRequestListPageProps = {
  searchParams: {
    tab: "leave-request" | "on-leave" | "calender";
    filter: Filter;
    department: "hr" | "design";
  };
};

async function getLeaveRequests({ filter }: { filter: Filter }) {
  try {
    // getAuthHeader(),
    const res = await apiServer.get<LeavesDataApi>("/api/companies-app/company/leaves/", {
      headers: getAuthCookies(),
      params: { department: filter },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// async function getOnLeave() {
//   try {
//   } catch(err) {
//   }
// }

export default async function EmployeeRequestListPage({
  searchParams,
}: EmployeeRequestListPageProps) {
  let leaveRequestData;
  let onLeaveData;
  if (searchParams.tab === "leave-request") {
    leaveRequestData = await getLeaveRequests(searchParams.filter);
  } else if (searchParams.tab === "on-leave") {
    // onLeaveData = await getOnLeave();
  }

  return (
    <TabsWrapper
      activeTab={searchParams.tab || "leave-request"}
      activeFilter={searchParams.filter || "approved"}
      activeDepartment={searchParams.department || "hr"}
      leaveRequestData={leaveRequestData?.leaves_request}
      leaveBalanceData={null}
      employeeAvailabilityData={null}
      calendarData={null}
    />
  );
}
