import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalaryStructure from "./_components/SalaryStructure";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";
import StaffDetails from "./_components/StaffDetails";
import BankDetails from "./_components/BankDetails";
import TableSkeleton from "./_skeletons/TableSkeleton";
import { Card, CardContent } from "@/components/ui/card";

type MyTeamPageProps = {
  searchParams: {
    tab: "salary-detail" | "staff-details" | "bank-details";
  };
};

export const dynamic = "force-dynamic";

export default function MyTeamPage({ searchParams }: MyTeamPageProps) {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent>
        <Tabs
          value={searchParams.tab}
          defaultValue={searchParams.tab || "salary-details"}
          className="relative">
          <TabsList className="relative mb-4">
            <TabsTrigger value="staff-details" asChild>
              <Link href="?tab=staff-details" replace>
                Staff Details
              </Link>
            </TabsTrigger>
            <TabsTrigger value="salary-details" asChild>
              <Link href="?tab=salary-details" replace>
                Salary Details
              </Link>
            </TabsTrigger>
            <TabsTrigger value="bank-details" asChild>
              <Link href="?tab=bank-details" replace>
                Bank Details
              </Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent className="bg-white" value="staff-details">
            <Suspense fallback={<TableSkeleton />}>
              <StaffDetails />
            </Suspense>
          </TabsContent>

          <TabsContent className="bg-white" value="salary-details">
            <Suspense fallback={<TableSkeleton />}>
              <SalaryStructure />
            </Suspense>
          </TabsContent>

          <TabsContent className="bg-white" value="bank-details">
            <Suspense fallback={<TableSkeleton />}>
              <BankDetails />
            </Suspense>
          </TabsContent>
          <div className="absolute -top-[10px] right-0 flex gap-4">
            <Link href="/add-new-employee" className={buttonVariants({ size: "sm", className:"px-6" })}>
              Add Staff
            </Link>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
