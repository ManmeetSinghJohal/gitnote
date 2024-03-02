"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";

import { Badge } from "@/components/ui/badge";

const RightSideBar = () => {
  const { data: session } = useSession();
  return (
    <div className="min-w-[290px] bg-black-800 px-7 pt-10">
      <div className="mb-12 flex items-center gap-[6px]">
        <Image src="/assets/icons/logo.svg" alt="logo" width={36} height={36} />
        <div>
          <h3 className="paragraph-3-medium text-white-100">
            {session?.user?.name}
          </h3>
          <div className="paragraph-4-regular">{session?.user?.email}</div>
        </div>
      </div>

      <div>
        <h4 className="paragraph-3-bold mb-[18px] text-white-100">Tags</h4>

        <div className="space-y-5">
          <div className="flex flex-col items-start gap-3">
            <Badge
              variant="secondary"
              className="paragraph-3-medium bg-black-700 text-white-300"
            >
              Authentication
            </Badge>
            <Badge
              variant="secondary"
              className="paragraph-3-medium bg-black-700 text-white-300"
            >
              Authentication
            </Badge>
            <Badge
              variant="secondary"
              className="paragraph-3-medium bg-black-700 text-white-300"
            >
              Authentication
            </Badge>
            <Badge
              variant="secondary"
              className="paragraph-3-medium bg-black-700 text-white-300"
            >
              Authentication
            </Badge>
            <Badge
              variant="secondary"
              className="paragraph-3-medium bg-black-700 text-white-300"
            >
              Authentication
            </Badge>
            <Badge
              variant="secondary"
              className="paragraph-3-medium bg-black-700 text-white-300"
            >
              Authentication
            </Badge>
            <Badge
              variant="secondary"
              className="paragraph-3-medium bg-black-700 text-white-300"
            >
              Authentication
            </Badge>
            <Badge
              variant="secondary"
              className="paragraph-3-medium bg-black-700 text-white-300"
            >
              Authentication
            </Badge>
            <Badge
              variant="secondary"
              className="paragraph-3-medium bg-black-700 text-white-300"
            >
              Authentication
            </Badge>
            <Badge
              variant="secondary"
              className="paragraph-3-medium bg-black-700 text-white-300"
            >
              Authentication
            </Badge>
            <Badge
              variant="secondary"
              className="paragraph-3-medium bg-black-700 text-white-300"
            >
              Authentication
            </Badge>
            <Badge
              variant="secondary"
              className="paragraph-3-medium bg-black-700 text-white-300"
            >
              Authentication
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
