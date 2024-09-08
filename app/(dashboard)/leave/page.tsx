import { TabsWrapper } from "./_components/TabsWrapper";
import { apiServer, getAuthCookies } from "@/lib/server/api";
import { LeavesDataApi } from "@/types/dashboard";

type SearchParams = {
  tab: "leave-request" | "on-leave" | "calender";
  status: Status;
  department: Department;
  leaveType: LeaveType;
};

type EmployeeRequestListPageProps = {
  searchParams: SearchParams;
};

async function getLeaveRequests(searchParams: SearchParams) {
  try {
    const res = await apiServer.get<LeavesDataApi>("/api/companies-app/company/leaves/", {
      headers: getAuthCookies(),
      params: {
        status: searchParams.status || null,
        departments: searchParams.department || null,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export default async function EmployeeRequestListPage({
  searchParams,
}: EmployeeRequestListPageProps) {
  let leaveData;
  if (searchParams.tab !== "calender") {
    leaveData = await getLeaveRequests(searchParams);
  }

  return (
    <TabsWrapper
      activeTab={searchParams.tab || "leave-request"}
      leaveRequestData={leaveData || null}
      onLeaveData={leaveData || null}
      employeeAvailabilityData={null}
      calendarData={null}
    />
  );
}
