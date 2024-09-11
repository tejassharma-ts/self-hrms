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

export default function Profiles({ profiles, attendances }: ProfilesProps) {
  const [selectedProfile, setSelectedProfile] = useState<EmployeeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeAttendance, setEmployeeAttendance] = useState();

  useEffect(() => {
    if (selectedProfile) {
      const fetchAttendance = async () => {
        try {
          setIsLoading(true);
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().split("T")[0];

          const response = await apiCaller.get("/api/companies-app/employee/attendance/", {
            params: {
              employee_id: selectedProfile.id,
              date: formattedDate,
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
  }, [selectedProfile]);

  function render() {
    if (isLoading) {
      return <Icons.loaderCenter />;
    } else if (employeeAttendance && selectedProfile) {
      return <AttendanceDashboard employee={selectedProfile} attendances={employeeAttendance} />;
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
