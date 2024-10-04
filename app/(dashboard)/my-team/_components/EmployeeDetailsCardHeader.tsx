import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";

export const EmployeeDetailsCardHeader = ({ heading }: { heading: string }) => {
  return (
    <CardHeader>
      <div className={"border-b pb-5"}>
        <CardTitle>{heading}</CardTitle>
      </div>
    </CardHeader>
  );
};
