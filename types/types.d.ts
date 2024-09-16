type Status = "approved" | "denied" | "pending";
type Department = string[];
type LeaveType = string[];

interface Profile {
  id: string;
  name: string;
  monthlyPercentage: number;
  yearlyPercentage: number;
  profile_picture: string;
  department: string;
  today_status: string;
}

interface AttendanceData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  status: string;
  check_in_time: string | null;
  check_out_time: string | null;
  department: string;
  profile_picture: string;
}

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  department: string;
  position: string;
  email: string;
}

interface expense {
  id: string;
  employee: Employee;
  company: string;
  date_incurred: string;
  amount: string;
  description: string;
  category: string;
  bill: string;
  status: string;
}

interface Expenses {
  pending_total: number;
  approved_total: number;
  expenses: expense[];
}

export interface BonusData {
  employee: string;
  bonus_type_names: string[];
  amount: string;
  reason: string;
  date_awarded: string;
}

export interface BonusResponse {
  success: boolean;
  message: string;
}

export interface EmployeePayrollApiResponse {
  id: string;
  employee: {
    id: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    department: string;
    position: string;
  };
  pay_date: string;
  total_earnings: string;
  final_salary: string;
}

export type Payroll = {
  id: string;
  hra: string;
  conveyance: string;
  allowances: string;
  special_allowance: string;
  days_in_month: number;
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
  basic_salary?: string;
};
