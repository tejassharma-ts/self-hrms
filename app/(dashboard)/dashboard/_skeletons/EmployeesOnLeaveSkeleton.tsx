import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EmployeesOnLeaveSkeleton() {
  return (
    <div className="h-[300px] rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Employees On Leave</h2>
        <a href="#" className="text-sm text-black">
          View more
        </a>
      </div>
      <div className="overflow-x-auto">
        <div className="max-h-56 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Leave Start</TableHead>
                <TableHead>Leave End</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell className="py-2.5 font-medium">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="flex h-10 w-10 rounded-full" />
                      <div className="font-medium flex flex-col space-y-1">
                        <Skeleton className="h-[20px] w-[100px] rounded-full" />
                        <Skeleton className="h-[20px] w-[100px] rounded-full" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[100px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[100px] rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-[20px] w-[100px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[100px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[50px] rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
