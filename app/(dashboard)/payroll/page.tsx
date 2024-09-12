import React from "react";
import { getAuthCookies } from "@/lib/server/api";
import { PayrollHeader } from "./_components/PayrollHeader";
import { PayrollTable } from "./_components/PayrollTable";
import EmployeePayroll from "./_components/EmployePayroll";
import { apiCaller } from "@/lib/auth";

async function getPayroll({ year }: { year: number }) {
  try {
    const res = await apiCaller.get<Payroll[]>("/api/payroll_app/payrolls/", {
      headers: getAuthCookies(),
      params: {
        year: year,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(`Error getPayroll: ${err}`);
  }
}

export type Employee = {
  first_name: string;
  last_name: string;
  profile_picture: string;
  department: string;
  position: string;
};

export type Payroll = {
  id: string;
  employee: Employee;
  pay_date: string;
  days_worked: number;
  overtime_hours: string;
  overtime_pay: string;
  total_earnings: string;
  total_deductions: string;
  esi_contribution: string;
  pf_contribution: string;
  final_salary: string;
  gross_salary: string;
  in_hand_salary: string;
  arrears_amount: string;
  arrears_month: string | null;
  expense_reimbursement: string;
  created_at: string;
  updated_at: string;
  company: string;
  salary_structure: string;
  bonus?: string;
};

const PayrollPage = async ({ searchParams }: { searchParams: any }): Promise<React.ReactNode> => {

  const showPayrollHistory: boolean = searchParams.hasOwnProperty("payroll-history");
  const currentYear = new Date().getFullYear();
  const year = searchParams["year"] ? Number(searchParams["year"]) : currentYear;
  const payrollData: Payroll[] = await getPayroll({ year });

  return (
    <div className={"container w-full"}>
      <PayrollHeader />
      {!showPayrollHistory ? <PayrollTable payrollData={payrollData} /> : <EmployeePayroll />}
    </div>
  );
};

export default PayrollPage;
