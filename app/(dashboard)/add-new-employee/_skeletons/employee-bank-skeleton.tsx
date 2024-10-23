import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EmployeeBankDetailSkeleton() {
  return (
    <Card className="rounded-md">
      <CardContent className="pt-6">
        <div>
          <div className="flex flex-col">
            <div className="flex">
              <p className="ml-8 flex-1 font-semibold">Bank details</p>
              <div className="mb-8 grid w-full basis-[70%] grid-cols-1 gap-6 sm:grid-cols-1">
                {/* Skeleton for Account Holder's Name */}
                <div className="flex flex-col space-y-4">
                  <Skeleton className="h-5 w-32" /> {/* Placeholder for label */}
                  <Skeleton className="h-10 w-full" /> {/* Placeholder for input */}
                </div>

                {/* Skeleton for Bank Name */}
                <div className="flex flex-col space-y-4">
                  <Skeleton className="h-5 w-24" /> {/* Placeholder for label */}
                  <Skeleton className="h-10 w-full" /> {/* Placeholder for input */}
                </div>

                {/* Skeleton for Account Number */}
                <div className="flex flex-col space-y-4">
                  <Skeleton className="h-5 w-28" /> {/* Placeholder for label */}
                  <Skeleton className="h-10 w-full" /> {/* Placeholder for password input */}
                </div>

                {/* Skeleton for IFSC Code */}
                <div className="flex flex-col space-y-4">
                  <Skeleton className="h-5 w-20" /> {/* Placeholder for label */}
                  <Skeleton className="h-10 w-full" /> {/* Placeholder for input */}
                </div>
              </div>
            </div>
            <div className="flex">
              <p className="ml-8 flex-1 font-semibold">Upload Documents</p>
              <div className="mb-8 grid w-full basis-[70%] grid-cols-1 gap-6 sm:grid-cols-1">
                {/* Skeleton for PAN Number */}
                <div className="flex flex-col space-y-4">
                  <Skeleton className="h-5 w-24" /> {/* Placeholder for label */}
                  <Skeleton className="h-10 w-full" /> {/* Placeholder for input */}
                </div>

                {/* Skeleton for PAN Upload */}
                <div className="flex flex-col space-y-4">
                  <Skeleton className="h-5 w-28" /> {/* Placeholder for label */}
                  <Skeleton className="h-20 w-full" /> {/* Placeholder for dropzone */}
                </div>

                {/* Skeleton for Aadhar Number */}
                <div className="flex flex-col space-y-4">
                  <Skeleton className="h-5 w-20" /> {/* Placeholder for label */}
                  <Skeleton className="h-10 w-full" /> {/* Placeholder for password input */}
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {/* Skeleton for Aadhar Front */}
                  <div className="flex flex-col space-y-4">
                    <Skeleton className="h-5 w-36" /> {/* Placeholder for label */}
                    <Skeleton className="h-20 w-full" /> {/* Placeholder for dropzone */}
                  </div>

                  {/* Skeleton for Aadhar Back */}
                  <div className="flex flex-col space-y-4">
                    <Skeleton className="h-5 w-36" /> {/* Placeholder for label */}
                    <Skeleton className="h-20 w-full" /> {/* Placeholder for dropzone */}
                  </div>

                  {/* Skeleton for Passport */}
                  <div className="flex flex-col space-y-4">
                    <Skeleton className="h-5 w-28" /> {/* Placeholder for label */}
                    <Skeleton className="h-20 w-full" /> {/* Placeholder for dropzone */}
                  </div>

                  {/* Skeleton for Passbook */}
                  <div className="flex flex-col space-y-4">
                    <Skeleton className="h-5 w-28" /> {/* Placeholder for label */}
                    <Skeleton className="h-20 w-full" /> {/* Placeholder for dropzone */}
                  </div>
                </div>
              </div>
            </div>
            <Skeleton className="h-10 w-40 self-end" /> {/* Placeholder for submit button */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
