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
    today_status:string
}

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  profile_picture: string;
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