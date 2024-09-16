import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Employee } from "@/app/(dashboard)/employee-profile/[employeeId]/page";
import { EmployeeDetailsCardHeader } from "@/app/(dashboard)/employee-profile/_components/EmployeeDetailsCardHeader";

export const EmployeePersonalInformation = ({ employeeProfile }: { employeeProfile: Employee }) => {
  const personalInformationFields = [
    {
      name: "Name",
      value: `${employeeProfile.first_name} ${employeeProfile.last_name}`,
    },
    {
      name: "Job Title",
      value: `${employeeProfile.position}`,
    },
    {
      name: "Date of Joining",
      value: `${employeeProfile.date_joined}`,
    },
    {
      name: "Employee I'd",
      value: `${employeeProfile.id}`,
    },
    {
      name: "Department",
      value: `${employeeProfile.department}`,
    },
    {
      name: "Date of Birth",
      value: `${employeeProfile.date_of_birth}`,
    },
  ];
  return (
    <Card className="w-full border">
      <EmployeeDetailsCardHeader heading={"Personal Information"} />
      <CardContent>
        <div className={"flex items-center justify-between"}>
          <div className={"flex w-1/2 flex-col items-start gap-y-10"}>
            {personalInformationFields.slice(0, 3).map((person, index) => (
              <div key={index} className={"mx-10 flex flex-col gap-y-2 font-semibold"}>
                <h3 className={"text-gray-500"}>{person.name}</h3>
                <p>{person.value}</p>
              </div>
            ))}
          </div>
          <div className={"flex w-1/2 flex-col items-start gap-y-10"}>
            {personalInformationFields.slice(3, 6).map((person, index) => (
              <div key={index} className={"mx-10 flex flex-col gap-y-2 font-semibold"}>
                <h3 className={"text-gray-500"}>{person.name}</h3>
                <p>{person.value}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
