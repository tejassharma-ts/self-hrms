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
import { Employee } from "../../payroll/history/page";
import { getFullName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type EmployeeData = {
  id: string;
  basic_salary: string;
  hra: string;
  conveyance: string;
  allowances: string;
  special_allowance: string;
  bonuses: string;
  has_bonus: boolean;
  has_conveyance: boolean;
  has_hra: boolean;
  has_allowances: boolean;
  has_special_allowance: boolean;
  has_esi: boolean;
  has_pf: boolean;
  lta: string;
  medical: string;
  employee_contribution_esi: string;
  employer_contribution_esi: string;
  employee_contribution_pf: string;
  employer_contribution_pf: string;
  gratuity: string;
  total_ctc: string;
  gross_monthly_salary: string;
  created_at: string;
  updated_at: string;
  employee: Employee;
  company: string;
};

async function getSalaryStructure() {
  try {
    const res = await apiCaller.get<EmployeeData[]>("/api/payroll_app/salary-structures/", {
      headers: getAuthCookies(),
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export default async function SalaryStructure() {
  const salaryStructure = await getSalaryStructure();
  if (!salaryStructure) {
    return <h1>Opps</h1>;
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Profile Picture</TableHead>
            <TableHead>Basic Salary</TableHead>
            <TableHead>HRA</TableHead>
            <TableHead>Conveyance</TableHead>
            <TableHead>Allowances</TableHead>
            <TableHead>Special Allowance</TableHead>
            <TableHead>Bonuses</TableHead>
            <TableHead>Has Bonus</TableHead>
            <TableHead>Has Conveyance</TableHead>
            <TableHead>Has HRA</TableHead>
            <TableHead>Has Allowances</TableHead>
            <TableHead>Has Special Allowance</TableHead>
            <TableHead>Has ESI</TableHead>
            <TableHead>Has PF</TableHead>
            <TableHead>Total CTC</TableHead>
            <TableHead>Gross Monthly Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salaryStructure.map((data, index) => (
            <TableRow key={index}>
              <TableCell>
                {getFullName(data.employee.first_name, data.employee.last_name)}
              </TableCell>
              <TableCell>{data.employee.position}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={data.employee.profile_picture} />
                  <AvatarFallback>{data.employee.first_name}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{data.basic_salary}</TableCell>
              <TableCell>{data.hra}</TableCell>
              <TableCell>{data.conveyance}</TableCell>
              <TableCell>{data.allowances}</TableCell>
              <TableCell>{data.special_allowance}</TableCell>
              <TableCell>{data.bonuses}</TableCell>
              <TableCell className="text-center">
                <Checkbox checked={data.has_bonus} disabled />
              </TableCell>
              <TableCell className="text-center">
                <Checkbox checked={data.has_conveyance} disabled />
              </TableCell>
              <TableCell className="text-center">
                <Checkbox checked={data.has_hra} disabled />
              </TableCell>
              <TableCell className="text-center">
                <Checkbox checked={data.has_allowances} disabled />
              </TableCell>
              <TableCell className="text-center">
                <Checkbox checked={data.has_special_allowance} disabled />
              </TableCell>
              <TableCell className="text-center">
                <Checkbox checked={data.has_esi} disabled />
              </TableCell>
              <TableCell className="text-center">
                <Checkbox checked={data.has_pf} disabled />
              </TableCell>
              <TableCell>{data.total_ctc}</TableCell>
              <TableCell>{data.gross_monthly_salary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}