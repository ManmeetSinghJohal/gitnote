import React from "react";

import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" relative">
      <div className="flex">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 bg-black-900">
          <div className="w-full px-[30px] py-10">{children}</div>
        </section>
        <RightSideBar />
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
