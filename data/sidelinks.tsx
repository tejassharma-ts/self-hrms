import { Icons } from "@/components/Icons";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}
export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/dashboard",
    icon: <Icons.grid size={18} />,
  },
  {
    title: "My Team",
    href: "/orders",
    icon: <Icons.people size={18} />,
  },
  {
    title: "Attendence",
    href: "",
    icon: <Icons.finger size={18} />,
  },
  {
    title: "Leave",
    href: "/leave",
    icon: <Icons.absent size={18} />,
    sub: [
      {
        title: "Leave Request",
        href: "/leave?tab=leave-request",
        icon: <Icons.leaveRequest size={18} />,
      },
      {
        title: "On Leave",
        href: "/leave?tab=on-leave",
        icon: <Icons.absent size={18} />,
      },
      {
        title: "Calendar",
        href: "/leave?tab=calender",
        icon: <Icons.calendar size={18} />,
      },
    ],
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: <Icons.wallet size={18} />,
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: <Icons.rupee size={18} />,
    sub: [
      {
        title: "Overview",
        href: "/payroll/overview",
        icon: <Icons.tableContent size={18} />,
      },
      {
        title: "History",
        href: "/payroll/history",
        icon: <Icons.history size={18} />,
      },
      {
        title: "Payroll Settings",
        href: "/payroll/settings",
        icon: <Icons.setting size={18} />,
      },
    ],
  },
  {
    title: "Settings",
    href: "#",
    icon: <Icons.setting size={18} />,
  },
];
