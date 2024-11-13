import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export default function Section({ children, className }: SectionProps) {
  return <section className={cn("px-0 py-16 sm:w-full min-h-screen", className)}>{children}</section>;
}
