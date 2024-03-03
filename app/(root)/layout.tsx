import React from "react";

import LeftSideBar from "@/components/shared/LeftSideBar";
import Navbar from "@/components/shared/Navbar";
import RightSideBar from "@/components/shared/RightSideBar";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" relative">
      <div className="lg:hidden">
        <Navbar />
      </div>
      <div className="flex">
        <div className="hidden lg:flex">
          <LeftSideBar />
        </div>
        <section className="flex min-h-screen flex-1 bg-black-900">
          <div className="w-full px-5 py-[30px] lg:px-[30px] lg:py-10">
            {children}
          </div>
        </section>
        <div className="hidden xl:flex">
          <RightSideBar />
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
