import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaveRequest } from "@/types/dashboard";
import { formatISODate, getFullName } from "@/lib/utils";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useMultiSelect from "@/hooks/use-multiselect";

type EmployeeLeaveRequestProps = {
  leaveRequest: LeaveRequest[] | null;
};

// TODO: fetch data from server
const departments = ["Tech", "Management", "Marketing"];
const leaveType = ["Sick", "Casual", "Annual", "Maternity", "Paternity"];

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
  } = useMultiSelect<LeaveRequest>([], (leaveReq) => leaveReq.employee.id);

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
    return <h1>OOPS...</h1>;
  }

  return (
    <>
      <ScrollArea>
        <Table>
          <TableHeader className="bg-transparent text-[#A7AAB4]">
            <TableRow className="hover:bg-transparent [&_th]:text-black">
              <TableHead>
                <div className="flex items-center space-x-2">
                  {/* <Checkbox checked={!!selectedLeaves.length} onCheckedChange={handleSelectAll} /> */}
                  <span>Name</span>
                </div>
              </TableHead>
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
                      <DropdownMenuRadioItem value="rejected">Decline</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="">All Request</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaveRequest.map((col, idx) => (
              <TableRow key={idx} className={isLeaveSelected(col) ? "bg-muted/50" : ""}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={isLeaveSelected(col)}
                      onCheckedChange={() => {
                        handleSelectLeave(col);
                      }}
                    />
                    <span className="line-clamp-1 text-ellipsis font-medium">
                      {getFullName(col.employee.first_name, col.employee.last_name)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{col.employee.department}</TableCell>
                <TableCell>{col.leave_type}</TableCell>
                <TableCell>{formatISODate(col.start_date)}</TableCell>
                <TableCell>
                  <span className="line-clamp-2">{col.reason || "-"}</span>
                </TableCell>
                <TableCell>{col?.leave_duration ? col?.leave_duration + " days" : "-"}</TableCell>
                <TableCell className="capitalize">
                  {col.status === "Approved" ? (
                    <div className="flex items-center space-x-2">
                      <span className="flex size-5 items-center justify-center rounded-full bg-[#14AE5C]">
                        <Icons.check className="text-white" size={16} />
                      </span>
                      <span className="font-medium text-[#14AE5C]">Approved</span>
                    </div>
                  ) : col.status === "Rejected" ? (
                    <div className="flex items-center space-x-2">
                      <span className="flex size-5 items-center justify-center rounded-full bg-[#E8595A]">
                        <Icons.close className="text-white" size={16} />
                      </span>
                      <span className="font-medium text-[#E8595A]">Declined</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="flex size-6 items-center justify-center rounded-full">
                        <Icons.pending className="fill-[#9d9d9d] text-white" size={30} />
                      </span>
                      <span className="font-medium text-black">Pending</span>
                    </div>
                  )}
                </TableCell>
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
          <ScrollBar orientation="horizontal" />
        </Table>
      </ScrollArea>
      {selectedLeaves.length ? (
        <Button
          onClick={() => setShowBulkAction(true)}
          className="absolute -top-8 right-40 -translate-y-full">
          Bulk Action
        </Button>
      ) : null}
      <LeaveRequestOption
        hideDropDown
        bulkAction={showBulkAction}
        setShowBulkAction={setShowBulkAction}
        selectedLeaves={selectedLeaves}
        selectedLeaveIDs={selectedLeaves.map((leave) => leave.id)}
        clearSelectedLeaves={clearSelectedLeaves}
        handleSelectLeave={handleSelectLeave}
      />
    </>
  );
}
