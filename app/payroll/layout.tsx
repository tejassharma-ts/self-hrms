import React from "react";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import MainLayout from "@/components/custom/main-layout";
import { isUserAuthenticated } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import { UserNav } from "@/components/UserNav";
import { AuthProvider } from "@/context/auth-context";

const ExpensesLayout = ({ children }: { children: React.ReactNode }) => {
  const isAuth = isUserAuthenticated();

  if (!isAuth) {
    redirect("/auth");
  }
  return (
    <AuthProvider>
      <MainLayout>
        <Layout>
          <LayoutHeader sticky>
            <div className="ml-auto">
              <div className="ml-auto">
                <UserNav />
              </div>
            </div>
            {/* <Navbar /> */}
          </LayoutHeader>
          <LayoutBody>{children}</LayoutBody>
        </Layout>
      </MainLayout>
    </AuthProvider>
  );
};

export default ExpensesLayout;
