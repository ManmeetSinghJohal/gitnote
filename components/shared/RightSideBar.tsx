"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

import { Badge } from "@/components/ui/badge";

import UserDetails from "./UserDetails";

type RightSideBarProps = {
  postTags: { label: string; value: string }[];
};

const RightSideBar = ({ postTags }: RightSideBarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const applyFilter = (type: string, value: string) => {
    const mySearchParams = new URLSearchParams(searchParams.toString());

    console.log(mySearchParams.toString());

     if (mySearchParams.get(type) === value) {
       mySearchParams.delete(type);
       router.replace("/dashboard?" + mySearchParams.toString());
       return;
     } else {
       mySearchParams.set(type, value);
     }


    console.log(mySearchParams.toString());

    router.replace("/dashboard?" + mySearchParams.toString());
  };

  return (
    <div className="min-w-[290px] bg-black-800 px-7 pt-10">
      <UserDetails />
      <div>
        <h4 className="paragraph-3-bold mb-[18px] text-white-100">Tags</h4>

        <div className="space-y-5">
          <div className="flex flex-col items-start gap-3">
            {postTags.map((tag) => (
              <Badge
                key={tag.value + Math.random()}
                variant="secondary"
                className="paragraph-3-medium bg-black-700 text-white-300"
                onClick={() => applyFilter("tag", tag.value)}
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
