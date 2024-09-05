"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatTodaysDate, getFullName } from "@/lib/utils";
import { useClientAuth } from "@/context/auth-context";
import WelcomeCardSkeleton from "../_skeletons/WelcomeCardSkeleton";
import { toast } from "@/hooks/use-toast";
import { api } from "@/api/api";
import { useEffect } from "react";

export default function WelcomeCard() {
  const { authCompany, authUser, isLoading } = useClientAuth();
  const [attendanceStatus, setAttendanceStatus] = useState<
    "Checked In" | "Checkout Out" | "Not Checked In" | null
  >(null);

  useEffect(() => {
    if (authUser) {
      setAttendanceStatus(authUser.employee_profile.today_attendance_status);
    }
  }, [authUser]);

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
      if (attendanceStatus === "Not Checked In") {
        await api.post("/api/attendance_app/attendance/", {
          status: "Present",
        });
        toast({
          title: "Attendance",
          description: "Your attendance is recorded",
        });
        setAttendanceStatus("Checked In");
      } else if (attendanceStatus === "Checked In") {
        const res = await api.get("/api/attendance_app/attendance/");
        await api.patch("/api/attendance_app/attendance/", null, {
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
    }
  }

  function renderAttendanceStatus() {
    if (attendanceStatus === "Not Checked In")
      return (
        <Button variant="secondary" className="self-start" onClick={onAttendanceHandle}>
          Check in
        </Button>
      );
    else if (attendanceStatus === "Checked In") {
      return (
        <Button variant="secondary" className="self-start" onClick={onAttendanceHandle}>
          Check out
        </Button>
      );
    } else {
      // TODO: get the attendance timing
      return (
        <h1 className="text-sm font-medium text-white">Your attendance for today is recorded</h1>
      );
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
