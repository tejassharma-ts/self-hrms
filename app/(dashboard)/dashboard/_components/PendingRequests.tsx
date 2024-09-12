import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type PendingRequestsProps = {
  leaveRequestCount: number;
  expenseRequestCount: number;
};

export default async function PendingRequests({
  leaveRequestCount,
  expenseRequestCount,
}: PendingRequestsProps) {
  return (
    <Card className="h-[300px] w-full max-w-md">
      <CardHeader>
        <CardTitle>Pending Requests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RequestItem label="Leave Requests" value={leaveRequestCount} />
        <RequestItem label="Expense Requests" value={expenseRequestCount} />
      </CardContent>
    </Card>
  );
}

function RequestItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}
