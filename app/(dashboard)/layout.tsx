import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="h-full w-screen bg-red-500 grid grid-cols-[1fr] lg:grid-cols-[0.8fr_3.2fr] xl:grid-cols-[0.6fr_3.4fr] relative">
    <div className="flex">
      <Sidebar />

      <div className="mt-20 bg-slate-50 lg:mt-0 overflow-y-scroll h-screen lg:col-start-2 lg:col-end-3 xl:col-start-2 xl:col-end-4 w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
