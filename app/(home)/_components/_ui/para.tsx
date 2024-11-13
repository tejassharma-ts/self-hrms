import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ParaProps {
  children: ReactNode;
  className?: string;
}

export default function Para({ children, className }: ParaProps) {
  return <p className={cn("text-base leading-7 text-[#A1A1AA]", className)}>{children}</p>;
}
