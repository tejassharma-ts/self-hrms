import AddBankDetails from "./AddBankdetails";
import { apiCaller } from "@/lib/auth";
import { cookies } from "next/headers";

async function getEmployeeProfile(employeeID: string) {
  try {
    const res = await apiCaller.get("/api/companies-app/company/employee-detail/", {
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
    console.log("err", err);
  }
}

type BankEmployeeFormProps = {
  employeeID?: string;
};
export default async function BankEmployeeForm({ employeeID }: BankEmployeeFormProps) {
  const employee = employeeID ? await getEmployeeProfile(employeeID) : undefined;
  return <AddBankDetails employee={employee} />;
}