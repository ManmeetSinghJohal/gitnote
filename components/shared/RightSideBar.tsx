import React from "react";

import { Badge } from "@/components/ui/badge";

import UserDetails from "./UserDetails";

const RightSideBar = () => {
  return (
    <div className="min-w-[290px] bg-black-800 px-7 pt-10">
      <UserDetails />
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
