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
} from "lucide-react";

function CustomLoader() {
  return <Loader className="size-6 animate-spin" />;
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
};
