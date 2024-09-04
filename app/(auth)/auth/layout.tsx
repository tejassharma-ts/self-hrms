import { ReactNode } from "react";
export default function AuthLayout({ children }: { children: ReactNode }) {
  // Might do some thing to redirect user if already logged in
  return <main>{children}</main>;
}
