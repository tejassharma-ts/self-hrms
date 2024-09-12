"use client";

import { useState, useEffect } from "react";
import ProfileCarousel from "./ProfileCarousel";
import AttendanceList from "./AttendanceList";
import AttendanceDashboard from "./AttendanceDashboard";
import { apiCaller } from "@/lib/auth";
import { Icons } from "@/components/Icons";

type ProfilesProps = {
  profiles: EmployeeProfile[];
  attendances?: AttendanceData;
};

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
export default function Profiles({ profiles, attendances }: ProfilesProps) {
  const [selectedProfile, setSelectedProfile] = useState<EmployeeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeAttendance, setEmployeeAttendance] = useState();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth + "");
  const [selectedYear, setSelectedYear] = useState(currentYear + "");
  const [selectedStatus, setSelectedStatus] = useState("Present");

  useEffect(() => {
    if (selectedProfile) {
      const fetchAttendance = async () => {
        try {
          setIsLoading(true);
          const response = await apiCaller.get("/api/companies-app/employee/attendance/", {
            params: {
              employee_id: selectedProfile.id,
              month: selectedMonth || null,
              year: selectedYear,
              status: selectedStatus,
            },
          });
          const formattedAttendance = response.data.attendances.map((attendance: any) => ({
            date: attendance.date,
            check_in_time: attendance.check_in_time,
            check_out_time: attendance.check_out_time,
            status: attendance.status,
          }));
          setEmployeeAttendance(formattedAttendance);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      };

      fetchAttendance();
    }
  }, [selectedProfile, selectedMonth, selectedYear, selectedStatus]);

  function render() {
    if (isLoading) {
      return <Icons.loaderCenter />;
    } else if (employeeAttendance && selectedProfile) {
      return (
        <AttendanceDashboard
          employee={selectedProfile}
          attendances={employeeAttendance}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      );
    }
    return <AttendanceList attendances={attendances} />;
  }
  return (
    <div className="flex flex-col gap-10">
      <ProfileCarousel
        profiles={profiles}
        selectedProfile={selectedProfile}
        setSelectedProfile={setSelectedProfile}
      />
      <div className="relative">{render()}</div>
    </div>
  );
}
