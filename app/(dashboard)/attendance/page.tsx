import { apiCaller } from "@/lib/auth";
// import { getAuthCookies } from "@/lib/server/api";
import Profiles from "./_components/Profiles";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

type AttendancePercentageResponse = {
  employee_stats: any;
  month: number;
  year: number;
};

async function getProfiles() {
  try {
    const currentDate = new Date();
    const res = await apiCaller.get<AttendancePercentageResponse>(
      "/api/companies-app/attendance-percentage/",
      {
        params: {
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
        },
        headers: {
          Cookie: cookies()
            .getAll()
            .map(({ name, value }) => `${name}=${value}`)
            .join("; "),
        },
      },
    );
    return res.data;
  } catch (err) {
    console.log("Error", err);
  }
}

async function getAttendances() {
  try {
    const res = await apiCaller.get("/api/companies-app/company/attendance/status/", {
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
    });
    return res.data;
  } catch (err) {
    console.log("Error:", err);
  }
}

export default async function AttendancePage() {
  const [res, attendance] = await Promise.all([getProfiles(), getAttendances()]);

  if (!res) {
    return <h1>Opps</h1>;
  }
  return <Profiles profiles={res.employee_stats} attendances={attendance} />;
}
