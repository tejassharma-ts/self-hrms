"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import useLoaderStore from "@/model/loader";
import { useLocation } from "@/context/location-context";
import { usePathname } from "next/navigation";

const LayoutContext = React.createContext<{
  fixed: boolean;
} | null>(null);

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean;
}

const Layout = ({ className, fixed = false, ...props }: LayoutProps) => {
  const { isLoading } = useLoaderStore();

  return (
    <LayoutContext.Provider value={{ fixed }}>
      <div
        data-layout="layout"
        className={cn(
          "h-full overflow-hidden",
          fixed && "flex flex-col",
          {
            "overflow-auto": !isLoading,
          },
          className,
        )}
        {...props}
      />
    </LayoutContext.Provider>
  );
};
Layout.displayName = "Layout";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  sticky?: boolean;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, sticky, ...props }, ref) => {
    // Check if Layout.Header is used within Layout
    const contextVal = React.useContext(LayoutContext);
    if (contextVal === null) {
      throw new Error(`Layout.Header must be used within ${Layout.displayName}.`);
    }

    return (
      <div
        ref={ref}
        data-layout="header"
        className={cn(
          `z-10 flex h-[var(--header-height)] items-center gap-4 bg-background p-4 md:px-8`,
          contextVal.fixed && "flex-none",
          sticky && "sticky top-0",
          className,
        )}
        {...props}
      />
    );
  },
);
Header.displayName = "Header";

const Body = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const pathname = usePathname();

    // Check if Layout.Body is used within Layout
    const contextVal = React.useContext(LayoutContext);
    if (contextVal === null) {
      throw new Error(`Layout.Body must be used within ${Layout.displayName}.`);
    }

    return (
      <div
        ref={ref}
        data-layout="body"
        className={cn(
          "mt-0 px-4 py-2 md:overflow-hidden md:px-8",
          contextVal && contextVal.fixed && "flex-1",
          pathname.startsWith("/dashboard") && "bg-[#f5f7fa]",
          className,
        )}
        {...props}
      />
    );
  },
);
Body.displayName = "Body";

export { Layout, Header as LayoutHeader, Body as LayoutBody };
