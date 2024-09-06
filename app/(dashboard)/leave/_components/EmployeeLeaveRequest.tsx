import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaveRequest } from "@/types/dashboard";
import { getFullName } from "@/lib/utils";
import useSelectItems from "@/hooks/use-select-items";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import MultiSelector from "./MultiSelector";
import LeaveRequestOption from "./LeaveAction";

type EmployeeLeaveRequestProps = {
  leaveRequest: LeaveRequest[] | null;
};

// TODO: fetch data from server
const departments = ["Tech", "Management", "Marketing"];
const leaveType = ["Sick leave", "Casual leave"];
const status = ["Approved", "Rejected", "Pending"];

export default function EmployeeLeaveRequest({ leaveRequest }: EmployeeLeaveRequestProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, refresh } = useRouter();

  const {
    handleSelectChange: handleDepartmentChange,
    isOptionSelected: isDepartmentSelected,
    selectedItems: selectedDepartments,
  } = useSelectItems(departments);

  const {
    handleSelectChange: handleLeaveTypeChange,
    isOptionSelected: isLeaveTypeSelected,
    selectedItems: selectedLeaveType,
  } = useSelectItems(leaveType);

  const {
    handleSelectChange: handleStatusChange,
    isOptionSelected: isStatusSelected,
    selectedItems: selectedStatus,
  } = useSelectItems(status);

  function onSearchDepartment() {
    const params = new URLSearchParams(searchParams);
    params.set("department", selectedDepartments.join(","));
    replace(`${pathname}?${params.toString()}`);
    refresh();
  }

  function onLeaveTypeChange() {
    const params = new URLSearchParams(searchParams);
    params.set("leave_type", selectedLeaveType.join(","));
    replace(`${pathname}?${params.toString()}`);
    refresh();
  }

  function onStatusChange() {
    const params = new URLSearchParams(searchParams);
    params.set("status", selectedStatus.join(","));
    replace(`${pathname}?${params.toString()}`);
    refresh();
  }

  if (!leaveRequest) {
    return <h1>Opps</h1>;
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of employees as per requested filter.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="capitalize">Name</TableHead>
            <TableHead className="capitalize">
              <MultiSelector
                label="department"
                values={departments}
                handleSelectChange={handleDepartmentChange}
                isOptionSelected={isDepartmentSelected}
                onSearch={onSearchDepartment}
              />
            </TableHead>
            <TableHead className="capitalize">
              <MultiSelector
                label="Leave type"
                values={leaveType}
                handleSelectChange={handleLeaveTypeChange}
                isOptionSelected={isLeaveTypeSelected}
                onSearch={onLeaveTypeChange}
              />
            </TableHead>
            <TableHead>Date Requested</TableHead>
            <TableHead>Reason of leave</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="capitalize">
              <MultiSelector
                label="Status"
                values={status}
                handleSelectChange={handleStatusChange}
                isOptionSelected={isStatusSelected}
                onSearch={onStatusChange}
              />
            </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveRequest.map((col, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">
                {getFullName(col.employee.first_name, col.employee.last_name)}
              </TableCell>
              <TableCell>{col.employee.department}</TableCell>
              <TableCell>{col.leave_type}</TableCell>
              <TableCell>{col.start_date}</TableCell>
              <TableCell>{col.reason}</TableCell>
              <TableCell>_</TableCell>
              <TableCell className="capitalize">{col.status}</TableCell>
              <TableCell>
                <LeaveRequestOption
                  leaveRequest={col}
                  employeeName={getFullName(col.employee.first_name, col.employee.last_name)}
                  leaveId={col.id}
                  isRejected={col.status === "Rejected"}
                  isApproved={col.status === "Approved"}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
