import { AttendanceDataApi } from "@/types/dashboard";
import ValueCard from "./ValueCard";
import { getAuthCookies } from "@/lib/server/api";
import { apiCaller } from "@/lib/auth";

async function getEmployeeAttendence() {
  try {
    const res = await apiCaller.get<AttendanceDataApi>("/api/companies-app/company/attendance/", {
      headers: getAuthCookies(),
    });
    return res.data;
  } catch (err) {
    // console.log("What the hell", err);
  }
}
export default async function EmployeeStatus() {
  const employeeStatus = await getEmployeeAttendence();
  if (!employeeStatus) {
    return (
      <div className="col-span-4">
        <h1>Opps can't fetch</h1>
      </div>
    );
  }

  return (
    <>
      <div className="col-span-2 mb-4">
        <ValueCard
          key={1}
          value={employeeStatus.present_count}
          title="Checked In"
          subtitle="Open/Closed"
        />
      </div>
      <div className="col-span-2 mb-4">
        <ValueCard
          key={2}
          value={employeeStatus.absent_count}
          title="Absent"
          subtitle="Not checked In + On Leave"
        />
      </div>
    </>
  );
}
