import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { EmployeeDetailsCardHeader } from "@/app/(dashboard)/my-team/_components/EmployeeDetailsCardHeader";

export const AccountDetails = ({ employeeProfile }: { employeeProfile: any }) => {
  const accountFields = [
    {
      name: "Employee Type",
      value: `${employeeProfile?.first_name || "N/A"}`,
    },
    {
      name: "Bank Account Number",
      value: `${employeeProfile?.account_number || "N/A"}`,
    },
    {
      name: "Account Holder",
      value: `${employeeProfile?.bank_name || "N/A"}`,
    },
    {
      name: "IFSC Code",
      value: `${employeeProfile?.ifsc_code || "N/A"}`,
    },
  ];

  return (
    <Card className="w-full border">
      <EmployeeDetailsCardHeader heading={"Account Details"} />
      <CardContent>
        <div className={"flex items-center justify-between"}>
          <div className={"flex w-1/2 flex-col items-start gap-y-10"}>
            {accountFields.slice(0, 2).map((account, index) => (
              <div key={index} className={"mx-10 flex flex-col gap-y-2 font-semibold"}>
                <h3 className={"text-gray-500"}>{account.name}</h3>
                <p>{account.value}</p>
              </div>
            ))}
          </div>
          <div className={"flex w-1/2 flex-col items-start gap-y-10"}>
            {accountFields.slice(2, 4).map((account, index) => (
              <div key={index} className={"mx-10 flex flex-col gap-y-2 font-semibold"}>
                <h3 className={"text-gray-500"}>{account.name}</h3>
                <p>{account.value}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
