// import { getAuthCookies } from "@/lib/server/api";
import { AuthProvider } from "@/context/auth-context";
import { ReactNode } from "react";
import { apiCaller } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function getCompany() {
  try {
    const res = await apiCaller.get("/api/companies-app/company/profile/", {
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
    });
    return res.data;
  } catch (_) {}
}
async function CompanyProfileLayout({ children }: { children: ReactNode }) {
  // const company = await getCompany();
  // if (company) {
  //   redirect("/dashboard");
  // }
  return <AuthProvider>{children}</AuthProvider>;
}

export default CompanyProfileLayout;
