import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type PendingRequestsProps = {
  leaveRequestCount: number;
  expenseRequestCount: number;
  className: string;
};

export default async function PendingRequests({
  leaveRequestCount,
  expenseRequestCount,
  className,
}: PendingRequestsProps) {
  return (
    <Card className={cn("w-full rounded-2xl", className)}>
      <CardHeader>
        <CardTitle>Pending Requests</CardTitle>
      </CardHeader>
      <CardContent className="mt-auto flex items-center space-x-8 px-6 pt-4">
        <RequestItem
          label="Leave Requests"
          value={leaveRequestCount}
          href="/leave?status=pending"
        />
        <Separator orientation="vertical" className="h-[60px]" />
        <RequestItem label="Expense Requests" value={expenseRequestCount} href="/expenses" />
      </CardContent>
    </Card>
  );
}

function RequestItem({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <div className="flex">
      <div className="relative flex flex-col space-y-1">
        <h1 className="text-lg font-medium text-gray-500">{label}</h1>
        <span className="text-3xl font-bold text-foreground">{value}</span>
        <Link href={href} className="absolute inset-0" />
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
