import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectAnalyticsSkeleton() {
  return (
    <Card className="oveflow-hidden h-[407px] w-full max-w-3xl">
      <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-[40px] w-[80px] rounded-full" />
    </Card>
  );
}
