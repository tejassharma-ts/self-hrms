"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import CustomCalendar from "./CustomCalender";
import { Icons } from "@/components/Icons";
import { LeavesDataApi } from "@/types/dashboard";
import EmployeeLeaveRequest from "./EmployeeLeaveRequest";

type Filter = "approved" | "denied" | "pending";

type TabsWrapperProps = {
  activeTab: "leave-request" | "on-leave" | "calender";
  leaveRequestData: LeavesDataApi | null;
  onLeaveData: LeavesDataApi | null;
  employeeAvailabilityData: any;
  calendarData: any;
  activeFilter: Filter;
};

type Options = {
  activeTab: string;
  activeFilter: Filter;
};

export function TabsWrapper({
  activeTab,
  activeFilter,
  leaveRequestData,
}: TabsWrapperProps) {
  const [options, setOptions] = useState<Options>({ activeTab, activeFilter });

  return (
    <>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Employee Request List</h1>
      </div>
      <Card>
        <Tabs
          value={options.activeTab}
          onValueChange={(value) => setOptions((pre) => ({ ...pre, activeTab: value }))}
          defaultValue={options.activeFilter}>
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
          </CardHeader>
          <CardContent>
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
