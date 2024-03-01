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
    <div>
      <Link href={"/signin"}>
        <Button>Sign In</Button>
      </Link>
      <Link href={"/signup"}>
        <Button>Sign up</Button>
      </Link>
    </div>
  );
};

export default Home;
