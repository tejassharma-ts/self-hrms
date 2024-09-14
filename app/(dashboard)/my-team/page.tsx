import React from "react";
import { apiCaller } from "@/lib/auth";
import { getAuthCookies } from "@/lib/server/api";
import { Employee } from "@/app/(dashboard)/my-team/employee-profile/[employeeId]/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export type Employees = {
  employees: Employee[];
};

async function getAllEmployeeProfiles() {
  try {
    const res = await apiCaller.get("/api/companies-app/company/add-employee/", {
      headers: getAuthCookies(),
    });
    return res.data;
  } catch (err) {
    throw new Error(`Error getPayroll: ${err}`);
  }
}

const MyTeamPage = async () => {
  const allEmployeeProfiles: Employees = await getAllEmployeeProfiles();
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>EmployeeID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Date of Birth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allEmployeeProfiles.employees.map((eachEmployeeProfile) => (
            <TableRow key={eachEmployeeProfile.id}>
              <TableCell>
                <Link
                  href={`/my-team/employee-profile/${eachEmployeeProfile.id}/?tab=person-details`}>
                  {eachEmployeeProfile.id}
                </Link>
              </TableCell>
              <TableCell>
                {eachEmployeeProfile.first_name} {eachEmployeeProfile.last_name}
              </TableCell>{" "}
              <TableCell>{eachEmployeeProfile.email}</TableCell>{" "}
              <TableCell>{eachEmployeeProfile.phone_number}</TableCell>
              <TableCell>{eachEmployeeProfile.date_of_birth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyTeamPage;
