import React from "react";
import { TabsCard } from "@/app/(dashboard)/employee-profile/_components/TabsCard";
import { Card, CardContent } from "@/components/ui/card";
import { EmployeeProfile } from "@/app/(dashboard)/employee-profile/_components/EmployeeProfile";
import { apiCaller } from "@/lib/auth";
import { getAuthCookies } from "@/lib/server/api";
import { EmployeePersonalInformation } from "@/app/(dashboard)/employee-profile/_components/EmployeePersonalInformation";
import { EmployeeAddressDetails } from "@/app/(dashboard)/employee-profile/_components/EmployeeAddressDetails";
import { EmployeeDocuments } from "@/app/(dashboard)/employee-profile/_components/EmployeeDocuments";
import { ContactDetails } from "@/app/(dashboard)/employee-profile/_components/ContactDetails";
import { AccountDetails } from "@/app/(dashboard)/employee-profile/_components/AccountDetails";

export type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string | null;
  date_of_birth: string;
  position: string;
  date_joined: string;
  salary: string;
  is_active: boolean;
  is_hr: boolean;
  created_at: string;
  updated_at: string;
  department: string;
  profile_picture: string;
  bank_name: string | null;
  account_number: string | null;
  ifsc_code: string | null;
  aadhar_number: string | null;
  pan_number: string | null;
  gender: string | null;
  user: string;
  company: string;
};

type params = {
  employeeId: string;
};

async function getEmployeeProfile({ employeeId }: { employeeId: string }) {
  try {
    const res = await apiCaller.get<Employee>("/api/companies-app/company/employee-detail/", {
      headers: getAuthCookies(),
      params: {
        employee_id: employeeId,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(`Error getPayroll: ${err}`);
  }
}

const EmployeeProfilePage = async ({
  searchParams,
  params,
}: {
  searchParams: any;
  params: params;
}) => {
  const employeeId = params.employeeId;
  const tab = searchParams.tab;
  const employeeProfile: Employee = await getEmployeeProfile({ employeeId });
  return (
    <div className="">
      <Card className="flex h-[calc(100vh-10rem)] min-w-full">
        <CardContent>
          <TabsCard employeeId={employeeId} />
        </CardContent>
        <div className="flex-grow">
          <CardContent>
            <EmployeeProfile employeeProfile={employeeProfile} />
          </CardContent>
          {tab === "person-details" && (
            <>
              <CardContent>
                <EmployeePersonalInformation employeeProfile={employeeProfile} />
              </CardContent>
              <CardContent>
                <EmployeeAddressDetails employeeProfile={employeeProfile} />
              </CardContent>
              <CardContent>
                <EmployeeDocuments employeeProfile={employeeProfile} />
              </CardContent>
            </>
          )}
          {tab === "contact-details" && (
            <CardContent>
              <ContactDetails employeeProfile={employeeProfile} />
            </CardContent>
          )}
          {tab === "account-details" && (
            <CardContent>
              <AccountDetails employeeProfile={employeeProfile} />
            </CardContent>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EmployeeProfilePage;
