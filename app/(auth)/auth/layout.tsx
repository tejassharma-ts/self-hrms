import { ReactNode } from "react";
import { isUserAuthenticated } from "@/lib/server/auth";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const isAuth = isUserAuthenticated();

  if (isAuth) {
    redirect("/dashboard");
  }

  return <main>{children}</main>;
}
