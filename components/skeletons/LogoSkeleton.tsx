import { Skeleton } from "../ui/skeleton";

type LogoSkeletonProps = {
  isCollapsed: boolean;
};

export default function LogoSkeleton({ isCollapsed }: LogoSkeletonProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
      {!isCollapsed && <Skeleton className="h-[20px] w-[100px]" />}
    </div>
  );
}
