import { useEffect, useState } from "react";
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
import DateRangeSelect from "./DateRangeSelect";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { Checkbox } from "@/components/ui/checkbox";

type EmployeeLeaveRequestProps = {
  leaveRequest: LeaveRequest[] | null;
};

// TODO: fetch data from server
const departments = ["Tech", "Management", "Marketing"];
const leaveType = ["Sick leave", "Casual leave"];

export default function EmployeeLeaveRequest({ leaveRequest }: EmployeeLeaveRequestProps) {
  const [status, setStatus] = useState("");
  const [showBulkAction, setShowBulkAction] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, refresh } = useRouter();

  const {
    handleSelectChange: handleSelectLeave,
    isOptionSelected: isLeaveSelected,
    selectedItems: selectedLeaves,
    clearSelectedItems: clearSelectedLeaves,
  } = useSelectItems([]);

  useEffect(() => {
    if (selectedLeaves.length) {
      clearSelectedLeaves();
    }
  }, [leaveRequest]);

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

  function onStatusChange(status: string) {
    console.log(status);
    const params = new URLSearchParams(searchParams);
    params.set("status", status);
    replace(`${pathname}?${params.toString()}`);
    refresh();
    setStatus(status);
  }

  if (!leaveRequest) {
    return <h1>Opps</h1>;
  }

  return (
    <>
      <Table>
        <TableCaption>A list of employees as per requested filter.</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>
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
            <TableHead>
              <DateRangeSelect />
            </TableHead>
            <TableHead>Reason of leave</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <span>Status</span>
                    <Icons.listFilter size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Leave status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={status} onValueChange={onStatusChange}>
                    <DropdownMenuRadioItem value="approved">Approved</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="rejected">Rejected</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveRequest.map((col, idx) => (
            <TableRow key={idx} className={isLeaveSelected(col.id) ? "bg-muted/50" : ""}>
              <TableCell className="flex items-center space-x-2">
                <Checkbox
                  checked={isLeaveSelected(col.id)}
                  onCheckedChange={() => {
                    handleSelectLeave(col.id);
                  }}
                />
                <span className="line-clamp-1 text-ellipsis font-medium">
                  {getFullName(col.employee.first_name, col.employee.last_name)}
                </span>
              </TableCell>
              <TableCell>{col.employee.department}</TableCell>
              <TableCell>{col.leave_type}</TableCell>
              <TableCell>{col.start_date}</TableCell>
              <TableCell>
                <span className="line-clamp-1 text-ellipsis">{col.reason}</span>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell className="capitalize">{col.status}</TableCell>
              <TableCell>
                <LeaveRequestOption
                  leaveRequest={col}
                  employeeName={getFullName(col.employee.first_name, col.employee.last_name)}
                  leaveId={col.id}
                  isRejected={col.status === "Rejected"}
                  isApproved={col.status === "Approved"}
                  hideDropDown={false}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedLeaves.length ? (
        <Button onClick={() => setShowBulkAction(true)} className="absolute -top-12 right-0">
          Bulk Action
        </Button>
      ) : null}
      <LeaveRequestOption
        hideDropDown
        bulkAction={showBulkAction}
        setShowBulkAction={setShowBulkAction}
        selectedLeaveIDs={selectedLeaves}
        clearSelectedLeaves={clearSelectedLeaves}
      />
    </>
  );
}
