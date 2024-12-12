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
  position?: string;
  email: string;
  phone_number?: string;
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

interface IPayrollExpenseDetails {
  id: string;
  employee: Employee;
  company: string;
  date_incurred: string;
  amount: string;
  description: string;
  category: string;
  bill: string;
  status: "pending" | "approved" | "rejected";
}

type LeaveRequest = {
  id: string;
  employee: Employee;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  applied_at: string;
  reviewed_at: string | null;
  leave_duration: number | null;
  rejection_reason: string | null;
  company: string;
  reviewer: string | null;
};

type EmployeeLeaveStats = {
  total_casual_leaves: number;
  casual_leave_balance: number;
  total_sick_leaves: number;
  sick_leave_balance: number;
  privilege_leave_balance: number;
  total_privilege_leaves: number;
  used_privilege_leaves: number;
};

type LeavesResponse = {
  leaves_request: LeaveRequest[];
  leaves_request_count: number;
  employee_leave_stats: EmployeeLeaveStats;
};

type Attendance = {
  employee: string;
  company: string;
  date: string;
  check_in_time: string | null;
  check_out_time: string | null;
  status: "Present" | "On Leave" | "Half Day" | "Absent";
  lat: string | null;
  long: string | null;
  id: string;
};

type EmployeeAttendance = {
  employee: Employee;
  attendances: Attendance[];
};

interface Bonus {
  employee: string;
  bonus_types: any[];
  amount: string;
  reason: string;
  date_awarded: string;
  company: string;
}

interface Bonuses {
  bonuses: Bonus[];
  bonuses_count: number;
}

interface Deduction {
  employee: string;
  amount: string;
  date_applied: string;
  payroll_period: string | null;
  reason: string;
  company: string;
  deduction_types: any[];
}

interface Deductions {
  deductions: Deduction[];
  deductions_count: number;
}

interface Payroll {
  [x: string]: ReactNode;
  slip_sent_status?: boolean;
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
  total_deductions: number;
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
  bonus: number;
  monthly_bonus?: string;
}

type EmployeeProfile = {
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

interface ExpensesDetails extends expense {
  hr_approved: boolean;
  accounts_approved: boolean;
  approval_date: string | null;
  rejection_reason: string | null;
  company: string;
}
