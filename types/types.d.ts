interface Profile {
    id: string;
    name: string;
    monthlyPercentage: number;
    yearlyPercentage: number;
    profile_picture: string | null;
    department: string;
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