import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewHireSkeleton() {
  return (
    <Card className="mx-auto h-48 w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 px-4">
        <CardTitle className="text-[21px] font-bold">New Hires</CardTitle>
        <Button variant="ghost" className="text-[11px]">
          View more
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-28 w-full pr-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="mb-4 flex items-center justify-between last:mb-0">
              <div className="flex flex-col space-y-1">
                <Skeleton className="h-[20px] w-[140px] rounded-full" />{" "}
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              </div>
              <Skeleton className="h-[20px] w-[100px] rounded-full" />
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
