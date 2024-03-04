import React from "react";

import Logo from "@/components/shared/Logo";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-black-900 pt-14 lg:pt-[72px]">
      <div className="mx-6 flex flex-col items-center">
        <div className="lg:hidden">
          <Logo textSize="text-[38px]" width={31} height={36} />
        </div>
        <div className="hidden lg:flex">
          <Logo textSize="text-[52px]" width={42} height={50} />
        </div>
        {children}
      </div>
    </main>
  );
};

export default Layout;
