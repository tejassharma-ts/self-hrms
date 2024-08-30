"use client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EmployeeList from "./EmployeeList";
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

type Filter = "approved" | "denied" | "pending";

type TabsWrapperProps = {
  activeTab: any;
  leaveRequestData: any;
  leaveBalanceData: any;
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
  leaveBalanceData,
  employeeAvailabilityData,
  calendarData,
}: TabsWrapperProps) {
  const [options, setOptions] = useState<Options>({ activeTab, activeFilter });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", options.activeTab);
    params.set("filter", options.activeFilter);
    replace(`${pathname}?${params.toString()}`);
  }, [options]);

  return (
    <Card>
      <Tabs
        value={options.activeTab}
        onValueChange={(value) =>
          setOptions((pre) => ({ ...pre, activeTab: value }))
        }
        defaultValue={options.activeFilter}
      >
        <CardHeader className="relative">
          <TabsList className="self-start">
            <TabsTrigger value="leave-request">Leave Request</TabsTrigger>
            <TabsTrigger value="leave-balance">Leave Balance</TabsTrigger>
            <TabsTrigger value="employee-availability">
              Employee Availability
            </TabsTrigger>
            <TabsTrigger value="calender">Calender</TabsTrigger>
          </TabsList>
          <div className="absolute right-0 top-4">
            <Select
              value={options.activeFilter}
              onValueChange={(value: Filter) =>
                setOptions((pre) => ({ ...pre, activeFilter: value }))
              }
            >
              <SelectTrigger
                className={cn(
                  buttonVariants({
                    variant: "default",
                    className: "w-auto",
                  }),
                )}
              >
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="denied">Denied</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="leave-request">
            <EmployeeList />
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
