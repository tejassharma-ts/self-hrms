import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiCaller } from "@/lib/auth";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getFullName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cookies } from "next/headers";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type Staff = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
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

type EmployeeApiRes = {
  employees: Staff[];
};

async function getAllStaff() {
  try {
    const res = await apiCaller.get<EmployeeApiRes>("/api/companies-app/company/add-employee/", {
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
    });
    return res.data.employees;
  } catch (err) {
    console.log(err);
  }
}

export default async function StaffDetails() {
  const staffs = await getAllStaff();
  if (!staffs) {
    return <h1>OOPS</h1>;
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Profile Picture</TableHead>
            <TableHead>Gender</TableHead>
            {/* <TableHead>ID</TableHead> */}
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Joining Date</TableHead>
            {/* <TableHead>Salary</TableHead> */}
            {/* <TableHead>Is Active</TableHead> */}
            {/* <TableHead>Bank Name</TableHead> */}
            {/* <TableHead>Account Number</TableHead> */}
            {/* <TableHead>IFSC Code</TableHead> */}
            <TableHead>Aadhaar</TableHead>
            <TableHead>PAN</TableHead>
            {/* <TableHead>Created At</TableHead> */}
            {/* <TableHead>Updated At</TableHead> */}
            {/* <TableHead>Is HR</TableHead> */}
            {/* <TableHead>User</TableHead> */}
            {/* <TableHead>Company</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffs.map((data, index) => (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TableRow key={index}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{getFullName(data.first_name, data.last_name)}</TableCell>
                    <TableCell className="flex justify-center">
                      <Avatar>
                        <AvatarImage src={data.profile_picture} />
                        <AvatarFallback>{data.first_name}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{data.gender || "N/A"}</TableCell>
                    {/* <TableCell>{data.id}</TableCell> */}
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data.phone_number}</TableCell>
                    <TableCell>{data.address}</TableCell>
                    <TableCell>{data.date_of_birth}</TableCell>
                    <TableCell className="capitalize">{data.department}</TableCell>
                    <TableCell>{data.position}</TableCell>
                    <TableCell>{data.date_joined}</TableCell>
                    {/* <TableCell>{data.salary}</TableCell> */}
                    {/* <TableCell className="text-center"> */}
                    {/*   <Checkbox checked={data.is_active} disabled /> */}
                    {/* </TableCell> */}
                    {/* <TableCell>{data.account_number || "N/A"}</TableCell> */}
                    {/* <TableCell>{data.bank_name || "N/A"}</TableCell> */}
                    {/* <TableCell>{data.ifsc_code || "N/A"}</TableCell> */}
                    <TableCell>{data.aadhar_number || "N/A"}</TableCell>
                    <TableCell>{data.pan_number || "N/A"}</TableCell>
                    {/* <TableCell>{data.user}</TableCell> */}
                    {/* <TableCell>{data.company}</TableCell> */}
                    {/* <TableCell>{formatISODate(data.created_at)}</TableCell> */}
                    {/* <TableCell>{formatISODate(data.updated_at)}</TableCell> */}
                    {/* <TableCell className="text-center"> */}
                    {/*   <Checkbox checked={data.is_hr} disabled /> */}
                    {/* </TableCell> */}
                  </TableRow>
                </TooltipTrigger>
                <TooltipContent align="end" asChild sideOffset={-10}>
                  <Button className="relative" variant="outline">
                    Edit employee
                    <Link
                      href={`my-team/employee-profile/${data.id}/?tab=person-details`}
                      className="absolute inset-0"
                    />
                  </Button>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
