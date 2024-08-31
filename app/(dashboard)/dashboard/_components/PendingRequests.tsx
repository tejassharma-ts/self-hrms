import { delay } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default async function PendingRequests() {
  // await delay(2000);
  return (
    <Card className="w-full h-[300px] max-w-md">
      <CardHeader>
        <CardTitle>Pending Requests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RequestItem label="Leave Requests" value="23" />
        <RequestItem label="Expense Requests" value="15" />
      </CardContent>
    </Card>
  )
}

function RequestItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  )
}
