"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Badge } from "@/components/ui/badge";

import UserDetails from "./UserDetails";

type RightSideBarProps = {
  postTags: { label: string; value: string }[];
};

const RightSideBar = ({ postTags }: RightSideBarProps) => {
  const router = useRouter();
  return (
    <div className="min-w-[290px] bg-black-800 px-7 pt-10">
      <UserDetails />
      <div>
        <h4 className="paragraph-3-bold mb-[18px] text-white-100">Tags</h4>

        <div className="space-y-5">
          <div className="flex flex-col items-start gap-3">
            {postTags.map((tag) => (
              <Badge
                variant="secondary"
                className="paragraph-3-medium bg-black-700 text-white-300"
                key={tag.value + Math.random()}
                onClick={() => router.push('/dashboard?tag=' + tag.value)}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
