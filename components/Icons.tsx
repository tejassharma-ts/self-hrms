import {
  EllipsisVertical,
  X,
  Plus,
  UsersRound,
  Fingerprint,
  UserRoundX,
  Wallet,
  IndianRupee,
  Settings,
  LayoutGrid,
  ChevronRight,
  ChevronLeft,
  Loader,
  ListFilter,
  UserRoundPen,
  Calendar,
  TableOfContents,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CustomLoaderProps = {
  className?: string;
};

function CenterLoader() {
  return (
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <CustomLoader />
    </span>
  );
}

function CustomLoader({ className }: CustomLoaderProps) {
  return <Loader className={cn("size-5 animate-spin", className)} />;
}

export const Icons = {
  option: EllipsisVertical,
  close: X,
  add: Plus,
  right: ChevronRight,
  left: ChevronLeft,
  people: UsersRound,
  finger: Fingerprint,
  absent: UserRoundX,
  wallet: Wallet,
  rupee: IndianRupee,
  setting: Settings,
  grid: LayoutGrid,
  loader: CustomLoader,
  listFilter: ListFilter,
  leaveRequest: UserRoundPen,
  calendar: Calendar,
  tableContent: TableOfContents,
  history: History,
  loaderCenter: CenterLoader,
};
