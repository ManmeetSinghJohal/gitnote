"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";

import { Button } from "./ui/button";

const UserInfo = () => {
  const { data: session } = useSession();
  return (
    <div className="grid h-full place-items-center">
      <div className="my-6 flex flex-col gap-2 bg-zinc-300/10 p-8 shadow-lg">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <Button
          variant="secondary"
          size="lg"
          className="cursor-pointer bg-black-600 text-white-100"
          onClick={() => signOut()}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;
