"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";

const UserDetails = () => {
  const { data: session } = useSession();
  return (
    <div className="mb-10 flex items-center gap-[6px] lg:mb-12">
      <Image src="/assets/icons/logo.svg" alt="logo" width={36} height={36} />
      <div>
        <h3 className="paragraph-3-medium text-white-100">
          {session?.user?.name}
        </h3>
        <div className="paragraph-4-regular">{session?.user?.email}</div>
      </div>
    </div>
  );
};

export default UserDetails;
