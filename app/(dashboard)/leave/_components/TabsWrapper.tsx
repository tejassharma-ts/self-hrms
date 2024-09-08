"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import CustomCalendar from "./CustomCalender";
import { Icons } from "@/components/Icons";
import { LeavesDataApi } from "@/types/dashboard";
import EmployeeLeaveRequest from "./EmployeeLeaveRequest";
import BulkManageRequest from "../_modals/BulkManageRequest";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type ActiveTab = "leave-request" | "on-leave" | "calender";

type TabsWrapperProps = {
  activeTab: ActiveTab;
  leaveRequestData: LeavesDataApi | null;
  onLeaveData: LeavesDataApi | null;
  employeeAvailabilityData: any;
  calendarData: any;
};

export function TabsWrapper({ activeTab, leaveRequestData }: TabsWrapperProps) {
  const [currentTab, setCurrentTab] = useState<ActiveTab>(activeTab);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, refresh } = useRouter();

  function onTabChange(tab: string) {
    const params = new URLSearchParams(searchParams);
    if (tab === "on-leave") {
      params.set("status", "approved");
    } else {
      params.set("status", "");
    }
    params.set("tab", tab);
    replace(`${pathname}?${params.toString()}`);
    refresh();
    setCurrentTab(tab as ActiveTab);
  }

  return (
    <>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Employee Request List</h1>
      </div>
      <Card>
        <Tabs value={currentTab} onValueChange={onTabChange} defaultValue={currentTab}>
          <CardHeader className="relative px-0">
            <TabsList className="self-start">
              <TabsTrigger value="leave-request">Leave Request</TabsTrigger>
              <TabsTrigger value="on-leave">On Leave</TabsTrigger>
              <TabsTrigger value="calender">Calender</TabsTrigger>
            </TabsList>
            <div className="absolute right-0 top-4">
              {activeTab === "calender" && (
                <Button variant="outline">
                  <Icons.add size={14} className="mr-2" />
                  Add Holiday
                </Button>
              )}
            </div>
            <div className="absolute right-40 top-4">
              <BulkManageRequest />
              {activeTab === "calender" && (
                <Button variant="outline">
                  <Icons.add size={14} className="mr-2" />
                  Add Holiday
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <TabsContent value="leave-request">
              <EmployeeLeaveRequest
                leaveRequest={
                  leaveRequestData?.leaves_request ? leaveRequestData.leaves_request : null
                }
              />
            </TabsContent>
            <TabsContent value="on-leave">
              <EmployeeLeaveRequest
                leaveRequest={
                  leaveRequestData?.leaves_request ? leaveRequestData.leaves_request : null
                }
              />
            </TabsContent>
            <TabsContent value="calender">
              <CustomCalendar />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </>
  );
}
