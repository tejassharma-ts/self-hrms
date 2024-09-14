type CompanyAccount = {
  id: string;
  company_name: string;
  address: string;
  company_website_url: string;
  owner: string;
  company_logo: string;
};

type Company = {
  id: string;
  company_name: string;
  address: string;
  company_website_url: string;
  esi_rate: string;
  employer_contribution_esi_rate: string;
  pf_rate: string;
  days_in_month: number;
  working_days: string;
  yearly_working_days: string;
};

type EmployeeProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  address: string;
  date_of_birth: string | null;
  position: string;
  date_joined: string;
  salary: string;
  is_active: boolean;
  is_hr: boolean;
  department: string | null;
  profile_picture: string | null;
  bank_name: string | null;
  account_number: string | null;
  ifsc_code: string | null;
  aadhar_number: string | null;
  pan_number: string | null;
  company: Company;
  today_attendance_status: "Checked In" | "Checkout Out" | "Not Checked In";
};

type UserAccount = {
  id: string;
  email: string;
  username: string;
  created_at: string;
  role: "employee" | "company";
  verify: boolean;
  phone_number: string | null;
  is_online: boolean;
  last_seen: string | null;
  company_name: string | null;
  employee_profile: EmployeeProfile;
  company_logo: string;
};

export type { CompanyAccount, UserAccount };
