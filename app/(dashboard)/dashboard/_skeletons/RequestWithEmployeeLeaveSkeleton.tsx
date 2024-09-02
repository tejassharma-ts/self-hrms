import EmployeesOnLeaveSkeleton from "./EmployeesOnLeaveSkeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RequestWithEmployeeLeaveSkeleton() {
  return (
    <>
      <div className="col-span-3 mb-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex">
              <Skeleton className="h-[20px] w-[150px] rounded-full" />
              <Skeleton className="h-[20px] w-[100px] rounded-full" />
            </div>
            <div className="flex">
              <Skeleton className="h-[20px] w-[150px] rounded-full" />
              <Skeleton className="h-[20px] w-[100px] rounded-full" />
            </div>
            <Skeleton className="h-[20px] w-[100px] rounded-full" />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-8 mb-4">
        <EmployeesOnLeaveSkeleton />
      </div>
    </>
  );
}
