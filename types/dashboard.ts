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
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  department: string;
  profile_picture: string;
};

type LeaveRequest = {
  id: string;
  employee: EmployeeOnLeave;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
  applied_at: string;
  reviewed_at: string | null;
  company: string;
  reviewer: string | null;
};

export type LeavesDataApi = {
  leaves_request: LeaveRequest[];
  leaves_request_count: number;
};
