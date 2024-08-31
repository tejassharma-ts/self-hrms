import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <LayoutHeader>
        <Navbar />
      </LayoutHeader>
      <LayoutBody>{children}</LayoutBody>
    </Layout>
  );
};

export default DashboardLayout;
