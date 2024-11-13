import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const containerVariants = cva("mx-auto px-4", {
  variants: {
    size: {
      default: "max-w-[1400px]",
      full: "max-w-full",
      lg: "max-w-6xl",
      md: "max-w-[800px]",
      sm: "max-w-2xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  className?: string;
}

export default function Container({ className, size, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ size, className }))} {...props} />;
}
