import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiCaller } from "@/lib/auth";
import { getAuthCookies } from "@/lib/server/api";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { getFullName } from "@/lib/utils";
import { cookies } from "next/headers";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link"
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

export default async function BankDetails() {
  const staffs = await getAllStaff();
  if (!staffs) {
    return <h1>Opps</h1>;
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Bank Name</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>IFSC Code</TableHead>
            <TableHead>Aadhar Number</TableHead>
            <TableHead>PAN Number</TableHead>
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
                    <TableCell>{getFullName(data.first_name, data.last_name)}</TableCell>
                    <TableCell>{data.phone_number}</TableCell>
                    <TableCell>{data.position}</TableCell>
                    <TableCell>{data.department}</TableCell>
                    <TableCell>{data.bank_name || "N/A"}</TableCell>
                    <TableCell>{data.account_number || "N/A"}</TableCell>
                    <TableCell>{data.ifsc_code || "N/A"}</TableCell>
                    <TableCell>{data.aadhar_number || "N/A"}</TableCell>
                    <TableCell>{data.pan_number || "N/A"}</TableCell>
                  </TableRow>
                </TooltipTrigger>
                <TooltipContent align="end" asChild sideOffset={-10}>
                  <Button className="relative" variant="ghost">
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
