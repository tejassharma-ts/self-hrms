import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalaryStructure from "./_components/SalaryStructure";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";
import StaffDetails from "./_components/StaffDetails";
import BankDetails from "./_components/BankDetails";
import TableSkeleton from "./_skeletons/TableSkeleton";

type MyTeamPageProps = {
  searchParams: {
    tab: "salary-detail" | "staff-details" | "bank-details";
  };
};

export default function MyTeamPage({ searchParams }: MyTeamPageProps) {
  return (
    <div>
      <Tabs defaultValue={searchParams.tab || "salary-details"} className="relative">
        <TabsList className="relative">
          <TabsTrigger value="salary-details" asChild>
            <Link href="?tab=salary-details" replace>
              Salary Details
            </Link>
          </TabsTrigger>
          <TabsTrigger value="staff-details" asChild>
            <Link href="?tab=staff-details" replace>
              Staff Details
            </Link>
          </TabsTrigger>
          <TabsTrigger value="bank-details" asChild>
            <Link href="?tab=bank-details" replace>
              Bank Details
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="salary-details">
          <Suspense fallback={<TableSkeleton />}>
            <SalaryStructure />
          </Suspense>
        </TabsContent>
        <TabsContent value="staff-details">
          <Suspense fallback={<TableSkeleton />}>
            <StaffDetails />
          </Suspense>
        </TabsContent>
        <TabsContent value="bank-details">
          <Suspense fallback={<TableSkeleton />}>
            <BankDetails />
          </Suspense>
        </TabsContent>
        <div className="absolute right-0 top-0 flex gap-4">
          <Link
            href="/addnewemploye"
            className={buttonVariants({ variant: "secondary", size: "sm" })}>
            Add Staff
          </Link>
          {/* <Link href="#" className={buttonVariants({ size: "sm" })}> */}
          {/*   Add Employee */}
          {/* </Link> */}
        </div>
      </Tabs>
    </div>
  );
}
