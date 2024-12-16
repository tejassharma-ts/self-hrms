import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "react-day-picker";
import { Icons } from "@/components/Icons";

type PendingRequestsProps = {
  leaveRequestCount?: number;
  expenseRequestCount?: number;
  className: string;
};

export default async function PreviousPayroll({
  leaveRequestCount = 34,
  expenseRequestCount = 34,
  className,
}: PendingRequestsProps) {
  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader>
        <CardTitle>Quick Reports</CardTitle>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col items-center px-6 pt-0">
        <div className="flex w-full items-center gap-4">
          <Icons.attendance />
          <h2 className="text-gray-500">Attendance Report</h2>
          <Link
            href="/attendance/records"
            className="ml-auto rounded-sm border border-[#cbd5e1] bg-[#f1f5f9] p-1 px-1.5 text-sm">
            View All
          </Link>
        </div>

        <Separator className="my-3" />
        <div className="flex w-full items-center gap-4">
          <Icons.leaveCalendar />
          <h2 className="text-gray-500">Leave Report</h2>
          <Link
            href="/leave/records"
            className="ml-auto rounded-sm border border-[#cbd5e1] bg-[#f1f5f9] p-1 px-1.5 text-sm">
            View All
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function RequestItem({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <div className="flex">
      <div className="flex flex-col space-y-1">
        <h1 className="text-base font-medium text-gray-500">{label}</h1>
        <span className="text-4xl font-bold text-foreground">{value}</span>
      </div>
    </div>
  );

  return (
    <div className="relative flex items-center justify-between rounded-lg border p-4">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-2xl font-bold">{value}</span>
      <Link href={href} className="absolute inset-0" />
    </div>
  );
}
