import { AuthProvider } from "@/context/auth-context";
import { ReactNode } from "react";

function CompanyProfileLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default CompanyProfileLayout;
