"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatTodaysDate } from "@/lib/utils";
import { useClientAuth } from "@/context/auth-context";
import WelcomeCardSkeleton from "../_skeletons/WelcomeCardSkeleton";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { apiCaller } from "@/lib/auth";
import { Icons } from "@/components/Icons";
import { parse, format } from "date-fns";
import { cn } from "@/lib/utils";

type AttendanceTiming = {
  check_in_time: string | null;
  check_out_time: string | null;
};

export default function WelcomeCard({ className }: { className: string }) {
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const { authCompany, authUser, isLoading } = useClientAuth();
  const [attendanceTiming, setAttendanceTiming] = useState<AttendanceTiming>({
    check_in_time: null,
    check_out_time: null,
  });
  const [attendanceStatus, setAttendanceStatus] = useState<
    "Checked In" | "Checkout Out" | "Not Checked In" | null
  >(null);

  const formatTime = (timeString: string) => {
    const cleanedTime = timeString.split(".")[0];
    const parsedTime = parse(cleanedTime, "HH:mm:ss", new Date());

    return format(parsedTime, "hh:mm a");
  };

  useEffect(() => {
    async function getAttendance() {
      try {
        const res = await apiCaller.get("/api/attendance_app/login-time/", {
          params: {
            employee_id: authUser?.employee_profile.id,
          },
        });
        const checkInTime = res.data?.check_in_time ? formatTime(res.data.check_in_time) : null;
        const checkOutTime = res.data?.check_out_time ? formatTime(res.data.check_out_time) : null;

        console.log(res);
        setAttendanceTiming({
          check_in_time: checkInTime,
          check_out_time: checkOutTime,
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

  if (isLoading) {
    return <WelcomeCardSkeleton />;
  }

  function greet() {
    if (authUser) {
      return <h1>Hello! {authUser.employee_profile.first_name}</h1>;
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
      try {
        const res = await apiCaller.get("/api/attendance_app/login-time/", {
          params: {
            employee_id: authUser?.employee_profile.id,
          },
        });
        const checkInTime = res.data?.check_in_time ? formatTime(res.data.check_in_time) : null;
        const checkOutTime = res.data?.check_out_time ? formatTime(res.data.check_out_time) : null;
        setAttendanceTiming({
          check_in_time: checkInTime,
          check_out_time: checkOutTime,
        });
      } catch (err) {
        console.log("Error");
      }
      setAttendanceLoading(false);
    }
  }

  function renderAttendanceStatus() {
    if (authUser) {
      if (!attendanceTiming.check_in_time && !attendanceTiming.check_out_time)
        return (
          <Button variant="secondary" className="self-start" onClick={onAttendanceHandle}>
            <span className="mr-2">{attendanceLoading && <Icons.loader />}</span>
            Check in
          </Button>
        );
      else if (attendanceTiming.check_in_time && !attendanceTiming.check_out_time) {
        return (
          <div className="flex flex-col items-start justify-between space-y-2 text-sm text-white">
            <h1>
              Checked in: <span className="font-semibold">{attendanceTiming.check_in_time}</span>
            </h1>
            <Button variant="secondary" className="order-1" onClick={onAttendanceHandle}>
              <span className="mr-2">{attendanceLoading && <Icons.loader />}</span>
              Check out
            </Button>
          </div>
        );
      } else {
        // TODO: get the attendance timing
        return (
          <div className="text-white">
            <div className="flex flex-col space-y-1 text-sm">
              <p>
                Checked In: <span className="font-semibold">{attendanceTiming.check_in_time}</span>
              </p>
              <p>
                Checked Out:{" "}
                <span className="font-semibold">{attendanceTiming.check_out_time}</span>
              </p>
            </div>
          </div>
        );
      }
    }
  }
  return (
    <Card
      className={cn(
        "relative mx-auto h-48 w-full overflow-hidden rounded-2xl bg-[#212721]",
        className,
      )}>
      {/* <img src="/background.png" className="absolute inset-0 w-full h-full"/> */}
      <img src="/texture.png" className="absolute inset-0 w-full h-full"/>
      {/* <div className="absolute inset-0 bg-opacity-50" /> */}
      <CardContent className="relative z-10 flex h-full flex-col p-6">
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-white">{greet()}</h2>
          <p className="mt-1 text-sm font-medium text-white">{formatTodaysDate()}</p>
        </div>
        {renderAttendanceStatus()}
      </CardContent>
    </Card>
  );
}
