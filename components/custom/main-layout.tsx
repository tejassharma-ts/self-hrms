"use client";

import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  // TODO: should not be hard coded
  const isCollapsed = false;
  return (
    <main
      id="content"
      className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}>
      {children}
    </main>
  );
}
