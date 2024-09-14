import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { EditButton } from "@/app/(dashboard)/employee-profile/_components/EditButton";

export const EmployeeDetailsCardHeader = ({ heading }: { heading: string }) => {
  return (
    <CardHeader>
      <div className={"flex items-center justify-between border-b pb-5"}>
        <CardTitle>{heading}</CardTitle>
        <CardTitle>
          <EditButton />
        </CardTitle>
      </div>
    </CardHeader>
  );
};
