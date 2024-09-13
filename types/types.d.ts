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

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  profile_picture: string;
}

// In attendance page
interface EmployeeProfile {
  id: string;
  name: string;
  profile_picture: string;
  department: string;
  monthly_percentage: number;
  yearly_percentage: number;
  today_status: string;
  today_check_in_time: string;
  today_check_out_time: string;
}

interface AttendanceData {
  employees: {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    position: string,
    status: string,
    check_in_time: string | null,
    check_out_time: string | null,
    department: string,
    profile_picture: string,
  }[],
  total_employee: number;
}

interface Expenses {
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
