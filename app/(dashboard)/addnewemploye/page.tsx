import { apiCaller } from "@/lib/auth";
import StepperForms from "./_components/StepperForm";
import { cookies } from "next/headers";

type NewEmployeePageProps = {
  searchParams: {
    employeeID: string;
  };
};

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
export default async function NewEmployeePage({ searchParams }: NewEmployeePageProps) {
  const { employeeID } = searchParams;

  let employee;
  if (employeeID) {
    employee = await getEmployeeProfile(employeeID);
  }

  return <StepperForms employee={employee} />;
}
