export type NewHire = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  position: string;
  date_joined: string;
  is_active: boolean;
  profile_picture: string | null;
};

type EmployeeOnLeave = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  department: string;
  profile_picture: string;
};

export type LeaveRequest = {
  id: string;
  employee: EmployeeOnLeave;
  leave_type: string;
  start_date: string;
  end_date: string;
  from_time: string;
  end_time: string;
  reason: string;
  status: "Approved" | "Rejected" | "Pending";
  applied_at: string;
  reviewed_at: string | null;
  company: string;
  reviewer: string | null;
  leave_duration: string | null;
};

export type LeavesDataApi = {
  leaves_request: LeaveRequest[];
  leaves_request_count: number;
};

type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  profile_picture: string | null;
};

export type AttendanceDataApi = {
  checked_in_employees: Employee[];
  not_yet_marked_employees: Employee[];
  absent_employees: Employee[];
  present_count: number;
  not_yet_marked_count: number;
  absent_count: number;
  total_employee: number;
  status: number;
};

type TeamMember = {
  id: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
};

export type Meeting = {
  id: string;
  title: string;
  description: string;
  add_link: string;
  date: string;
  team: TeamMember[];
  company: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type AssignedEmployee = {
  id: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
};

export type Project = {
  id: string;
  company: string;
  project_name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: "Ongoing" | "Completed";
  assigned_employees: AssignedEmployee[];
  created_at: string;
  updated_at: string;
  completion_percentage: string;
};
