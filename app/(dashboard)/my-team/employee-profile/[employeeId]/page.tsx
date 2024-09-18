import React from "react";
import { TabsCard } from "@/app/(dashboard)/my-team/_components/TabsCard";
import { Card, CardContent } from "@/components/ui/card";
import { EmployeeProfile } from "@/app/(dashboard)/my-team/_components/EmployeeProfile";
import { apiCaller } from "@/lib/auth";
import { getAuthCookies } from "@/lib/server/api";
import { EmployeePersonalInformation } from "@/app/(dashboard)/my-team/_components/EmployeePersonalInformation";
import { EmployeeAddressDetails } from "@/app/(dashboard)/my-team/_components/EmployeeAddressDetails";
import { EmployeeDocuments } from "@/app/(dashboard)/my-team/_components/EmployeeDocuments";
import { ContactDetails } from "@/app/(dashboard)/my-team/_components/ContactDetails";
import { AccountDetails } from "@/app/(dashboard)/my-team/_components/AccountDetails";
import { HistoryDetails } from "@/app/(dashboard)/my-team/_components/HistoryDetails";
import { Bonuses, Deductions, expense, LeavesResponse, Employee } from "@/types/types";
import { getMonthNumber } from "@/lib/utils";

type Params = {
  employeeId: string;
};

type SearchParams = {
  tab?: string;
  month?: string;
  year?: number;
};

async function fetchEmployeeData(employeeId: string, month?: number, year?: number) {
  const headers = getAuthCookies();

  const [employeeProfile, leaves, attendance, bonuses, deductions, expenses, payroll] =
    await Promise.all([
      apiCaller.get<Employee>("/api/companies-app/company/employee-detail/", {
        headers,
        params: { employee_id: employeeId },
      }),
      apiCaller.get<LeavesResponse>("/api/companies-app/company/leaves/", {
        headers,
        params: { employee_id: employeeId, month, year },
      }),
      apiCaller.get("/api/companies-app/employee/attendance/", {
        headers,
        params: { employee_id: employeeId, month, year },
      }),
      apiCaller.get<Bonuses>("/api/companies-app/employee-bonus-get/", {
        headers,
        params: { employee_id: employeeId, month, year },
      }),
      apiCaller.get<Deductions>("/api/companies-app/employee-deduction-get/", {
        headers,
        params: { employee_id: employeeId, month, year },
      }),
      apiCaller.get<expense[]>("/api/payroll_app/expenses-details/", {
        headers,
        params: { employee_id: employeeId, month, year },
      }),
      apiCaller.get("/api/payroll_app/payrolls/", {
        headers,
        params: { employee_id: employeeId, month, year },
      }),
    ]);

  return {
    employeeProfile: employeeProfile.data,
    leaves: leaves.data,
    attendance: attendance.data,
    bonuses: bonuses.data,
    deductions: deductions.data,
    expenses: expenses.data,
    payroll: payroll.data,
  };
}

export default async function EmployeeProfilePage({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: Params;
}) {
  const { month, year, tab } = searchParams;
  const { employeeId } = params;

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const monthNumber = month && getMonthNumber(month);
  const updatedMonth = monthNumber ? monthNumber : currentMonth + 1;
  const updatedYear = year ? year : currentYear;

  const { employeeProfile, leaves, attendance, bonuses, deductions, expenses, payroll } =
    await fetchEmployeeData(employeeId, updatedMonth, updatedYear);

  return (
    <div>
      <Card className="flex h-[calc(100vh-10rem)] w-screen overflow-y-scroll">
        <TabsCard employeeId={employeeId} />
        <div className="min-w-[80rem] max-w-[80rem]">
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
          {tab === "history" && (
            <CardContent>
              <HistoryDetails
                expenses={expenses}
                deductions={deductions}
                bonuses={bonuses}
                attendance={attendance}
                leaves={leaves}
                employeeProfile={employeeProfile}
                payrollData={payroll}
              />
            </CardContent>
          )}
        </div>
      </Card>
    </div>
  );
}
