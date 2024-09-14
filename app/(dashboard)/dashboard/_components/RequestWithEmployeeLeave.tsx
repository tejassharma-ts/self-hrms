import PendingRequests from "./PendingRequests";
import EmployeesOnLeave from "./EmployeesOnLeave";
import { getAuthCookies } from "@/lib/server/api";
import { LeavesDataApi } from "@/types/dashboard";
import { apiCaller } from "@/lib/auth";

async function getAllEmployeeLeave() {
  try {
    const res = await apiCaller.get<LeavesDataApi>("/api/companies-app/company/leaves/", {
      headers: getAuthCookies(),
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function getExpenseRequests() {
  try {
    const res = await apiCaller.get("/api/payroll_app/get-pending-expense-count/", {
      headers: getAuthCookies(),
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
export default async function RequestWithEmployeeLeave() {
  const res = await getAllEmployeeLeave();
  const expenseRequest = await getExpenseRequests();

  if (!res) {
    return (
      <>
        <div className="col-span-3 mb-4">Oops failed to fetch</div>
        <div className="col-span-8 mb-4">Oops failed to fetch</div>
      </>
    );
  }

  return (
    <>
      <div className="col-span-3 mb-4">
        <PendingRequests
          leaveRequestCount={res.leaves_request_count}
          expenseRequestCount={expenseRequest?.pending_expenses_count}
        />
      </div>
      <div className="col-span-8 mb-4">
        <EmployeesOnLeave leavesRequest={res.leaves_request} />
      </div>
    </>
  );
}
