import SalaryDetailsForm from "./SalaryDetailsForm";
import { apiCaller } from "@/lib/auth";
import { cookies } from "next/headers";

async function getSalaryStructure(employeeID: string) {
  try {
    const res = await apiCaller("/api/payroll_app/detail-salary-structures/", {
      params: {
        employee_id: employeeID,
      },
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

type SalaryEmployeeFormProps = {
  employeeID?: string;
};

// {
//   id: '52ff4d10-af30-4dea-a3d5-33c376db82e0',
//   basic_salary: '50000.00',
//   hra: '40000.00',
//   conveyance: '0.00',
//   allowances: '0.00',
//   special_allowance: '0.00',
//   bonuses: '0.00',
//   has_bonus: false,
//   has_conveyance: false,
//   has_hra: true,
//   has_allowances: false,
//   has_special_allowance: false,
//   has_esi: false,
//   has_pf: false,
//   lta: '200.00',
//   medical: '500.00',
//   employee_contribution_esi: null,
//   employer_contribution_esi: null,
//   employee_contribution_pf: null,
//   employer_contribution_pf: null,
//   gratuity: '0.00',
//   total_ctc: '1087800.00',
//   gross_monthly_salary: '100000.00',
//   is_gross_based: true,
//   is_component_based: false,
//   created_at: '2024-09-27T14:02:06.706009+05:30',
//   updated_at: '2024-09-27T14:02:06.706021+05:30',
//   employee: 'db049489-0d5b-4121-8d8f-b908c20169ac',
//   company: '108c7f96-0318-43c8-88c5-ab162bc73693'
// }

export default async function SalaryEmployeeForm({ employeeID }: SalaryEmployeeFormProps) {
  const salaryStructure = employeeID ? await getSalaryStructure(employeeID) : undefined;
  return <SalaryDetailsForm employeeID={employeeID} salaryStructure={salaryStructure} />;
}
