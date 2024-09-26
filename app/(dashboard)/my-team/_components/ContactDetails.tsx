import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { EmployeeDetailsCardHeader } from "@/app/(dashboard)/my-team/_components/EmployeeDetailsCardHeader";

export const ContactDetails = ({ employeeProfile }: { employeeProfile: any }) => {
  const contactFields = [
    {
      name: "Mobile Number",
      value: `${employeeProfile.phone_number}`,
    },
    {
      name: "Emergency Contact Number",
      value: `${employeeProfile.phone_number}`,
    },
    {
      name: "Personal Email I'd",
      value: `${employeeProfile.email}`,
    },
    {
      name: "Official Email I'd",
      value: `${employeeProfile.email}`,
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
