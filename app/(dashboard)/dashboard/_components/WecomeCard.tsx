"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatTodaysDate, getFullName } from "@/lib/utils";
import { useClientAuth } from "@/context/auth-context";
import WelcomeCardSkeleton from "../_skeletons/WelcomeCardSkeleton";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { apiCaller } from "@/lib/auth";
import { Icons } from "@/components/Icons";

export default function WelcomeCard() {
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const { authCompany, authUser, isLoading } = useClientAuth();
  const [attendanceTiming, setAttendanceTiming] = useState({
    check_in_time: null,
    check_out_time: null,
  });
  const [attendanceStatus, setAttendanceStatus] = useState<
    "Checked In" | "Checkout Out" | "Not Checked In" | null
  >(null);

  useEffect(() => {
    async function getAttendance() {
      try {
        const res = await apiCaller.get("/api/attendance_app/attendance/", {
          params: {
            employee_id: authUser?.employee_profile.id,
          },
        });
        setAttendanceTiming({
          check_in_time: res.data?.check_in_time || "8:30",
          check_out_time: res.data?.check_out_time || "10:50",
        });
      } catch (err) {
        console.log(err);
      }
    }

    if (authUser) {
      setAttendanceStatus(authUser.employee_profile.today_attendance_status);
      getAttendance();
    }
  }, [authUser]);

  useEffect(() => {
    if (
      (attendanceStatus && attendanceStatus === "Checked In") ||
      attendanceStatus === "Checkout Out"
    ) {
      console.log("Get attendace timing");
    }
  }, [attendanceStatus]);

  if (isLoading) {
    return <WelcomeCardSkeleton />;
  }

  function greet() {
    if (authUser) {
      return `Hello!! ${getFullName(authUser.employee_profile.first_name, authUser.employee_profile.last_name)}`;
    } else if (authCompany) {
      return `${authCompany.company_name}`;
    }
  }

  async function onAttendanceHandle() {
    try {
      setAttendanceLoading(true);
      if (attendanceStatus === "Not Checked In") {
        await apiCaller.post("/api/attendance_app/attendance/", {
          status: "Present",
        });
        toast({
          title: "Attendance",
          description: "Your attendance is recorded",
        });
        setAttendanceStatus("Checked In");
      } else if (attendanceStatus === "Checked In") {
        const res = await apiCaller.get("/api/attendance_app/attendance/");
        await apiCaller.patch("/api/attendance_app/attendance/", null, {
          params: {
            attendance_id: res.data.id,
          },
        });
        setAttendanceStatus("Checkout Out");
        toast({
          title: "Attendance",
          description: "Your attendance is recorded",
        });
      }
    } catch (err) {
      toast({
        title: "Attendance check",
        description: "Can't check in. Please try again later!",
        variant: "destructive",
      });
    } finally {
      setAttendanceLoading(false);
    }
  }

  function renderAttendanceStatus() {
    if (authUser) {
      if (attendanceStatus === "Not Checked In")
        return (
          <Button variant="secondary" className="self-start" onClick={onAttendanceHandle}>
            <span className="mr-2">{attendanceLoading && <Icons.loader />}</span>
            Check in
          </Button>
        );
      else if (attendanceStatus === "Checked In") {
        return (
          <div className="flex flex-col space-y-2 text-sm text-white">
            <h1>Checked in: {attendanceTiming.check_in_time}</h1>
            <Button variant="secondary" className="self-start" onClick={onAttendanceHandle}>
              <span className="mr-2">{attendanceLoading && <Icons.loader />}</span>
              Check out
            </Button>
          </div>
        );
      } else {
        // TODO: get the attendance timing
        return (
          <div className="text-white">
            <div className="flex flex-col space-y-1">
              <span>Checked In: {attendanceTiming.check_in_time}</span>
              <span>Checked Out: {attendanceTiming.check_out_time}</span>
            </div>
          </div>
        );
      }
    }
  }
  return (
    <Card className="relative mx-auto h-48 w-full max-w-md overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <CardContent className="relative z-10 flex h-full flex-col p-6">
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-white">{greet()}</h2>
          <p className="mb-6 text-sm text-white">{formatTodaysDate()}</p>
        </div>
        {renderAttendanceStatus()}
      </CardContent>
    </Card>
  );
}
