import { apiCaller } from "@/lib/auth";
import { cookies } from "next/headers";
import AddNewEmployeeForm from "./AddNewEmployeeForm";
import { toast } from "@/hooks/use-toast";

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
    toast({
      description: "Error getting employee profile.",
      variant: "destructive",
    });
    console.log("err", err);
  }
}

type BasicEmployeeFormProps = {
  employeeID?: string;
};
export default async function BasicEmployeeForm({ employeeID }: BasicEmployeeFormProps) {
  const employee = employeeID ? await getEmployeeProfile(employeeID) : undefined;
  return <AddNewEmployeeForm employee={employee} />;
}
