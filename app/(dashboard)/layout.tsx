import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import MainLayout from "@/components/custom/main-layout";
import { LocationProvider } from "@/context/location-context";
import { UserNav } from "@/components/UserNav";
import { AuthProvider } from "@/context/auth-context";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LocationProvider>
      <AuthProvider>
        <MainLayout>
          <Layout>
            <LayoutHeader sticky>
              <div className="ml-auto">
                <div className="ml-auto">
                  <UserNav />
                </div>
              </div>
            </LayoutHeader>
            <LayoutBody>{children}</LayoutBody>
          </Layout>
        </MainLayout>
      </AuthProvider>
    </LocationProvider>
  );
};

export default DashboardLayout;
