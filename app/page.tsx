import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";

import { Button } from "@/components/ui/button";

const Home = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="grid h-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Link href={"/signin"}>
          <Button>Sign In</Button>
        </Link>
        <Link href={"/signup"}>
          <Button>Sign up</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
