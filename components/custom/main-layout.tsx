"use client";

import { useState } from "react";
import Sidebar from "../sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className="relative h-full overflow-hidden bg-background">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}>
        {children}
      </main>
    </div>
  );
}
