import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditButton } from "@/app/(dashboard)/my-team/_components/EditButton";
import { EmployeeProfile as Employee } from "@/types/types";

export const EmployeeProfile = ({ employeeProfile }: { employeeProfile: any }) => {
  return (
    <Card className="w-full border">
      <CardContent>
        <div className={"mt-4 flex justify-between"}>
          <div className="flex items-center">
            <Avatar className="mr-4 h-32 w-32 border-2 border-white">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex h-24 flex-col justify-between font-semibold">
              <p className="text-xl">
                {employeeProfile.first_name} {employeeProfile.last_name}
              </p>
              <div>
                <p className="text-gray-600">ID: {employeeProfile.id}</p>
                <p className="text-gray-600">
                  {employeeProfile.gender ? employeeProfile.gender : "Male"}
                </p>
              </div>
            </div>
          </div>
          <EditButton employeeID={employeeProfile.id} />
        </div>
      </CardContent>
    </Card>
  );
};
