import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { EmployeeDetailsCardHeader } from "@/app/(dashboard)/my-team/_components/EmployeeDetailsCardHeader";

export const EmployeeAddressDetails = ({ employeeProfile }: { employeeProfile: any }) => {
  return (
    <Card className="w-full border">
      <EmployeeDetailsCardHeader heading={"Contact Details"} />
      <CardContent>
        <div className={"flex items-center justify-between"}>
          <div className={"flex w-1/2 flex-col items-start gap-y-10"}>
            <div className={"mx-10 flex flex-col gap-y-2 font-semibold"}>
              <h3 className={"text-gray-500"}>Current Address</h3>
              <p>{employeeProfile.address}</p>
            </div>
          </div>
          <div className={"flex w-1/2 flex-col items-start gap-y-10"}>
            <div className={"mx-10 flex flex-col gap-y-2 font-semibold"}>
              <h3 className={"text-gray-500"}>Permanent Address</h3>
              <p>{employeeProfile.address}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};