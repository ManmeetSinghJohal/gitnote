import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";

import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

const Home = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10">
      <div className="mx-6 flex flex-col items-center">
        <div className="lg:hidden">
          <Logo textSize="text-[38px]" width={31} height={36} />
        </div>
        <div className="hidden lg:flex">
          <Logo textSize="text-[82px]" width={72} height={80} />
        </div>
        <div className="lg:heading-1-medium subtitle-small text-white-100">
          A Knowledge Repository for Developers
        </div>
      </div>
      <div className="flex w-2/3 flex-col items-center gap-3 lg:gap-6">
        <Link href={"/signin"}>
          <Button className="transition-transform duration-300 hover:scale-105 w-52 lg:w-96">
            Sign In
          </Button>
        </Link>
        <Link href={"/signup"}>
          <Button className="transition-transform duration-300 hover:scale-105 w-52 lg:w-96">
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
