import { getAuthCookies } from "@/lib/server/api";
import { AuthProvider } from "@/context/auth-context";
import { ReactNode } from "react";
import { apiCaller } from "@/lib/auth";
import { redirect } from "next/navigation";

async function getCompany() {
  try {
    const res = await apiCaller.get("/api/companies-app/company/profile/", {
      headers: getAuthCookies(),
    });
    return res.data;
  } catch (_) {}
}
async function CompanyProfileLayout({ children }: { children: ReactNode }) {
  const company = await getCompany();
  if (company) {
    redirect("/dashboard");
  }
  return <AuthProvider>{children}</AuthProvider>;
}

export default CompanyProfileLayout;
