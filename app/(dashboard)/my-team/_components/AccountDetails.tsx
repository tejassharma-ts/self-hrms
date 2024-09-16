import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Employee } from "@/app/(dashboard)/my-team/employee-profile/[employeeId]/page";
import { EmployeeDetailsCardHeader } from "@/app/(dashboard)/my-team/_components/EmployeeDetailsCardHeader";

export const AccountDetails = ({ employeeProfile }: { employeeProfile: Employee }) => {
  const contactFields = [
    {
      name: "Employee Type",
      value: `${employeeProfile.first_name}`,
    },
    {
      name: "Bank Account Number",
      value: `${employeeProfile.account_number}`,
    },
    {
      name: "Account Holder",
      value: `${employeeProfile.bank_name}`,
    },
    {
      name: "IFSC Code",
      value: `${employeeProfile.ifsc_code}`,
    },
  ];
  return (
    <Card className="w-full border">
      <EmployeeDetailsCardHeader heading={"Contact Details"} />
      <CardContent>
        <div className={"flex items-center justify-between"}>
          <div className={"flex w-1/2 flex-col items-start gap-y-10"}>
            {contactFields.slice(0, 2).map((contact, index) => (
              <div key={index} className={"mx-10 flex flex-col gap-y-2 font-semibold"}>
                <h3 className={"text-gray-500"}>{contact.name}</h3>
                <p>{contact.value}</p>
              </div>
            ))}
          </div>
          <div className={"flex w-1/2 flex-col items-start gap-y-10"}>
            {contactFields.slice(2, 4).map((contact, index) => (
              <div key={index} className={"mx-10 flex flex-col gap-y-2 font-semibold"}>
                <h3 className={"text-gray-500"}>{contact.name}</h3>
                <p>{contact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
