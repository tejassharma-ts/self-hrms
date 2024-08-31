"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EmployeeList from "./EmployeeList";
import EmployeeLeave from "./EmployeeLeave";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import CustomCalendar from "../../_components/CustomCalender";
import { Icons } from "@/components/Icons";

type Filter = "approved" | "denied" | "pending";
type Department = "hr" | "design";

type TabsWrapperProps = {
  activeTab: "leave-request" | "on-leave" | "calender";
  leaveRequestData: any;
  leaveBalanceData: any;
  employeeAvailabilityData: any;
  calendarData: any;
  activeFilter: Filter;
  activeDepartment: Department;
};

type Options = {
  activeTab: string;
  activeFilter: Filter;
  activeDepartment: Department;
};

export function TabsWrapper({
  activeTab,
  activeFilter,
  activeDepartment,
  // leaveRequestData,
  // leaveBalanceData,
  // employeeAvailabilityData,
  // calendarData,
}: TabsWrapperProps) {
  const [options, setOptions] = useState<Options>({ activeTab, activeFilter, activeDepartment });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", options.activeTab);
    params.set("filter", options.activeFilter);
    params.set("department", options.activeDepartment);
    replace(`${pathname}?${params.toString()}`);
  }, [options]);

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
              {/* <TabsTrigger value="leave-balance">Leave Balance</TabsTrigger> */}
              <TabsTrigger value="on-leave">On Leave</TabsTrigger>
              <TabsTrigger value="calender">Calender</TabsTrigger>
            </TabsList>
            <div className="absolute right-0 top-4">
              {activeTab === "leave-request" && (
                <Select
                  value={options.activeFilter}
                  onValueChange={(value: Filter) =>
                    setOptions((pre) => ({ ...pre, activeFilter: value }))
                  }>
                  <SelectTrigger
                    className={cn(
                      buttonVariants({
                        variant: "default",
                        className: "w-auto",
                      }),
                    )}>
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="denied">Denied</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              )}
              {activeTab === "on-leave" && (
                <Select
                  value={options.activeDepartment}
                  onValueChange={(value: Department) =>
                    setOptions((pre) => ({ ...pre, activeDepartment: value }))
                  }>
                  <SelectTrigger
                    className={cn(
                      buttonVariants({
                        variant: "default",
                        className: "w-auto",
                      }),
                    )}>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hr">Hr</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              )}
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
              <EmployeeList />
            </TabsContent>
            <TabsContent value="on-leave">
              <EmployeeLeave />
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
