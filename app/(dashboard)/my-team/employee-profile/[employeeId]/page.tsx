import React from "react";
import { apiCaller } from "@/lib/auth";
import { getAuthCookies } from "@/lib/server/api";
import { TabsCard } from "@/app/(dashboard)/my-team/_components/TabsCard";
import { MemoizedEmployeeProfile } from "@/app/(dashboard)/my-team/_components/EmployeeProfile";
import { EmployeePersonalInformation } from "@/app/(dashboard)/my-team/_components/EmployeePersonalInformation";
import { EmployeeAddressDetails } from "@/app/(dashboard)/my-team/_components/EmployeeAddressDetails";
import { EmployeeDocuments } from "@/app/(dashboard)/my-team/_components/EmployeeDocuments";
import { ContactDetails } from "@/app/(dashboard)/my-team/_components/ContactDetails";
import { AccountDetails } from "@/app/(dashboard)/my-team/_components/AccountDetails";
import { HistoryDetails } from "@/app/(dashboard)/my-team/_components/HistoryDetails";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bonuses,
  Deductions,
  LeavesResponse,
  EmployeeProfile as Employee,
  ExpensesDetails,
  Payroll,
} from "@/types/types";
import { getMonthNumber } from "@/lib/utils";
import { leaveData } from "@/app/(dashboard)/my-team/_data/dummyData";
import { toast } from "@/hooks/use-toast";

type params = {
  employeeId: string;
};

interface EmployeeProfileSearchParams {
  tab: string;
  month: string;
  year: number;
  category?: string;
}

interface EmployeeProfileApiProps {
  employeeId: string;
  month: number;
  year: number;
}

async function getEmployeeProfile({ employeeId, month, year }: EmployeeProfileApiProps) {
  try {
    const res = await apiCaller.get<Employee>("/api/companies-app/company/employee-detail/", {
      headers: getAuthCookies(),
      params: {
        employee_id: employeeId,
        month,
        year,
      },
    });
    return res.data;
  } catch (err) {
    toast({
      description: "Error getting employee profile.",
      variant: "destructive",
    });
    throw new Error(`Error getEmployeeProfile: ${err}`);
  }
}
async function getEmployeeDeductions({ employeeId, month, year }: EmployeeProfileApiProps) {
  try {
    const res = await apiCaller.get<Deductions>("/api/companies-app/employee-deduction-get/", {
      headers: getAuthCookies(),
      params: {
        employee_id: employeeId,
        month,
        year,
      },
    });
    return res.data;
  } catch (err) {
    toast({
      description: "Error getting employee deductions.",
      variant: "destructive",
    });
    throw new Error(`Error getEmployeeDeductions: ${err}`);
  }
}
async function getEmployeeExpenses({ employeeId, month, year }: EmployeeProfileApiProps) {
  try {
    const res = await apiCaller.get<ExpensesDetails[]>("/api/payroll_app/expenses-details/", {
      headers: getAuthCookies(),
      params: {
        employee_id: employeeId,
        month,
        year,
      },
    });
    return res.data;
  } catch (err) {
    toast({
      description: "Error getting employee expenses.",
      variant: "destructive",
    });
    throw new Error(`Error getEmployeeExpenses: ${err}`);
  }
}
async function getEmployeeBonus({ employeeId, month, year }: EmployeeProfileApiProps) {
  try {
    const res = await apiCaller.get<Bonuses>("/api/companies-app/employee-bonus-get/", {
      headers: getAuthCookies(),
      params: {
        employee_id: employeeId,
        month,
        year,
      },
    });
    return res.data;
  } catch (err) {
    toast({
      description: "Error getting employee bonus.",
      variant: "destructive",
    });
    throw new Error(`Error getEmployeeBonus: ${err}`);
  }
}

async function getEmployeePayroll({ employeeId, month, year }: EmployeeProfileApiProps) {
  try {
    const res = await apiCaller.get<Payroll>("/api/payroll_app/payrolls/", {
      headers: getAuthCookies(),
      params: {
        employee_id: employeeId,
        month,
        year,
      },
    });
    return res.data;
  } catch (err) {
    toast({
      description: "Error getting employee payroll.",
      variant: "destructive",
    });
    throw new Error(`Error getEmployeePayroll: ${err}`);
  }
}
async function getEmployeeAttendance({ employeeId, month, year }: EmployeeProfileApiProps) {
  try {
    const res = await apiCaller.get("/api/companies-app/employee/attendance/", {
      headers: getAuthCookies(),
      params: {
        employee_id: employeeId,
        month,
        year,
      },
    });
    return res.data;
  } catch (err) {
    toast({
      description: "Error getting employee attendance.",
      variant: "destructive",
    });
    throw new Error(`Error getEmployeeAttendance: ${err}`);
  }
}

async function getHolidays({ month, year }: { month: number; year: number }) {
  try {
    const res = await apiCaller.get("api/attendance_app/get-holidays/", {
      headers: getAuthCookies(),
      params: {
        month,
        year,
      },
    });
    return res.data;
  } catch (err) {
    toast({
      description: "Error getting employee holidays.",
      variant: "destructive",
    });
    throw new Error(`Error getEmployeeAttendance: ${err}`);
  }
}

async function getLeavesOfEmployee({ employeeId, month, year }: EmployeeProfileApiProps) {
  try {
    const res = await apiCaller.get<LeavesResponse>("/api/companies-app/company/leaves/", {
      headers: getAuthCookies(),
      params: {
        employee_id: employeeId,
        month,
        year,
      },
    });
    return res.data;
  } catch (err) {
    toast({
      description: "Error getting leaves of employee.",
      variant: "destructive",
    });
    throw new Error("Error getting leaves of employee");
  }
}

const EmployeeProfilePage = async ({
  searchParams,
  params,
}: {
  searchParams: EmployeeProfileSearchParams;
  params: params;
}) => {
  const { month, year, tab } = searchParams;
  const monthNumber = month && getMonthNumber(month);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const updatedMonth = monthNumber ? monthNumber : currentMonth + 1;
  const updatedYear = year ? year : currentYear;
  const { employeeId } = params;

  const employeeProfile: Employee = await getEmployeeProfile({
    employeeId,
    month: updatedMonth,
    year: updatedYear,
  });

  let historyData = null;
  if (tab === "history") {
    const [leaves, attendance, bonuses, deductions, expenses, payroll, holidays] =
      await Promise.all([
        getLeavesOfEmployee({ employeeId, month: updatedMonth, year: updatedYear }),
        getEmployeeAttendance({ employeeId, month: updatedMonth, year: updatedYear }),
        getEmployeeBonus({ employeeId, month: updatedMonth, year: updatedYear }),
        getEmployeeDeductions({ employeeId, month: updatedMonth, year: updatedYear }),
        getEmployeeExpenses({ employeeId, month: updatedMonth, year: updatedYear }),
        getEmployeePayroll({ employeeId, month: updatedMonth, year: updatedYear }),
        getHolidays({ month: updatedMonth, year: updatedYear }),
      ]);
    historyData = { leaves, attendance, bonuses, deductions, expenses, payroll, holidays };
  }

  return (
    <section>
      <Card className="flex min-h-lvh w-full py-2">
        <TabsCard employeeId={employeeId} />
        <div className="h-full min-w-[55rem] flex-grow">
          <CardContent>
            <MemoizedEmployeeProfile employeeProfile={employeeProfile} />
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
          {tab === "history" && historyData && (
            <CardContent>
              <HistoryDetails
                holidays={historyData?.holidays}
                month={updatedMonth}
                year={updatedYear}
                expenses={historyData?.expenses}
                deductions={historyData?.deductions}
                bonuses={historyData?.bonuses}
                attendance={historyData?.attendance}
                leaves={historyData.leaves ? historyData.leaves : leaveData}
                employeeProfile={employeeProfile}
                payrollData={historyData?.payroll}
              />
            </CardContent>
          )}
        </div>
      </Card>
    </section>
  );
};

export default EmployeeProfilePage;
