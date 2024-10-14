import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EmployeeFormSkeleton() {
  return (
    <Card className="rounded-md">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-8">
          {/* Profile Picture Section */}
          <div className="mb-16 flex items-center space-x-8">
            <Skeleton className="h-40 w-40 rounded-full" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>

          {/* Basic Info Section */}
          <div className="space-y-8">
            <div className="flex">
              <h2 className="mb-4 ml-8 flex-1 text-lg font-semibold">Basic Info</h2>
              <div className="grid basis-[70%] grid-cols-2 gap-6 sm:grid-cols-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="flex">
              <h2 className="mb-4 ml-8 flex-1 text-lg font-semibold">Contact Info</h2>
              <div className="grid basis-[70%] grid-cols-2 gap-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Address Section */}
            <div className="flex">
              <h2 className="mb-4 ml-8 flex-1 text-lg font-semibold">Address</h2>
              <div className="flex basis-[70%] flex-col gap-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Employment Details Section */}
            <div className="flex">
              <h2 className="mb-4 ml-8 flex-1 text-lg font-semibold">Employment Details</h2>
              <div className="grid basis-[70%] grid-cols-2 gap-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="self-end">
            <Skeleton className="h-10 w-48" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
