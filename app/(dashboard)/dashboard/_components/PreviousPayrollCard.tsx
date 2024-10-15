import { apiCaller } from "@/lib/auth";
import { cookies } from "next/headers";
import PreviousPayroll from "./PreviousPayroll";

async function getPreviousPayroll() {
  try {
    const res = await apiCaller.get(
      "api/payroll_app/payrolls/?department=Marketing&month=09&employee_id=582ee07f-ce48-4dba-b9b8-9043c3acf5b5&year=",
      {
        headers: {
          Cookie: cookies()
            .getAll()
            .map(({ name, value }) => `${name}=${value}`)
            .join("; "),
        },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export default async function PreviousPayrollCard({ className }: { className: string }) {
  // const result = await getPreviousPayroll();
  return <PreviousPayroll className={className} />;
}
