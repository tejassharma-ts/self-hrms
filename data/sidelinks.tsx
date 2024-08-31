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
    label: "9",
    href: "/orders",
    icon: <Icons.people size={18} />,
    sub: [
      {
        title: "Something",
        href: "#",
        icon: <></>,
      },
      {
        title: "Something",
        href: "#",
        icon: <></>,
      },
    ],
  },
  {
    title: "Attendence",
    href: "",
    icon: <Icons.finger size={18} />,
    sub: [
      {
        title: "Something",
        href: "#",
        icon: <></>,
      },
      {
        title: "Something",
        href: "#",
        icon: <></>,
      },
    ],
  },
  {
    title: "Leave",
    label: "3",
    href: "#",
    icon: <Icons.absent size={18} />,
  },
  {
    title: "Expenses",
    href: "#",
    icon: <Icons.wallet size={18} />,
  },
  {
    title: "Payroll",
    href: "#",
    icon: <Icons.rupee size={18} />,
  },
  {
    title: "Settings",
    href: "#",
    icon: <Icons.setting size={18} />,
  },
];
