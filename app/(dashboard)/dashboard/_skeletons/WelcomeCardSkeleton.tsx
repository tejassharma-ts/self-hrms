import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function WelcomeCardSkeleton() {
  return (
    <Card className="w-full max-w-md h-48 mx-auto overflow-hidden relative">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <CardContent className="relative z-10 flex flex-col h-full p-6">
        <div className="flex-grow">
          <Skeleton className="w-[200px] h-[30px] rounded-full mb-2" />
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </div>
        <Skeleton className="h-10 px-4 py-2 rounded-full w-[90px]" />
      </CardContent>
    </Card>
  );
}
