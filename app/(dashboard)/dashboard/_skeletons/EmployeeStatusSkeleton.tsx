import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function EmployeeStatusSkeleton() {
  return (
    <>
      <div className="col-span-2 mb-4">
        <Card className="h-48 w-full p-4">
          <CardContent>
            <Skeleton className="h-[20px] w-[100px] rounded-full" />
            <Skeleton className="h-[20px] w-[100px] rounded-full mt-3" />
            <Skeleton className="h-[20px] w-[150px] rounded-full mt-3" />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2 mb-4">
        <Card className="h-48 w-full p-4">
          <CardContent>
            <Skeleton className="h-[20px] w-[100px] rounded-full" />
            <Skeleton className="h-[20px] w-[100px] rounded-full mt-3" />
            <Skeleton className="h-[20px] w-[150px] rounded-full mt-3" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
