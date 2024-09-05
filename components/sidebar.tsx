"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft as IconChevronsLeft,
  ChevronDown as IconMenu2,
  ChevronLeft as IconX,
} from "lucide-react";
import { Layout, LayoutHeader } from "./custom/layout";
import { Button } from "./ui/button";
import SideNav from "./side-nav";
import { cn } from "@/lib/utils";
import { sidelinks } from "@/data/sidelinks";
import Logo from "./logo";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ className, isCollapsed, setIsCollapsed }: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navOpened]);

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? "md:w-14" : "md:w-64"}`,
        className,
      )}>
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? "h-svh opacity-50" : "h-0 opacity-0"} w-full bg-black md:hidden`}
      />

      <Layout fixed className={navOpened ? "h-svh" : ""}>
        {/* Header */}
        <LayoutHeader sticky className="z-50 flex justify-center px-4 py-5 shadow-sm md:px-4">
          <div className={`flex w-full items-center ${!isCollapsed ? "gap-2" : ""}`}>
            <Logo isCollapsed={isCollapsed} />
            <span className="sr-only">Website Name</span>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}>
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </LayoutHeader>

        {/* Navigation links */}
        <SideNav
          id="sidebar-menu"
          className={`z-40 mx-2 h-full flex-1 overflow-auto ${navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="absolute -right-4 top-1/2 z-50 hidden rounded-full bg-white md:inline-flex">
          <IconChevronsLeft className={`h-4 w-4 stroke-[1.5] ${isCollapsed ? "rotate-180" : ""}`} />
        </Button>
      </Layout>
    </aside>
  );
}
