import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full w-screen bg-white relative">

            <div className="fixed h-full bg-white lg:w-1/4 xl:w-1/5 z-20">
                <Sidebar />
            </div>

            <div className="w-full fixed bg-white z-10">
                <Navbar />
            </div>

            <div className="mt-20 lg:mt-0 overflow-y-scroll w-full h-screen lg:ml-[25%] xl:ml-[20%]">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
