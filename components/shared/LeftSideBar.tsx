import Image from "next/image";
import React from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const LeftSideBar = () => {
  return (
    <div className="w-[290px] bg-black-800 px-7 pt-10">
      <div className="mb-12 flex gap-1">
        <Image src="/assets/icons/logo.svg" alt="logo" width={20} height={24} />
        <h3 className="text-2xl font-bold text-white-100">GitNote</h3>
      </div>
      <div className="mb-6 space-y-4">
        <Button className="w-[235px] bg-custom-gradient">
          <Image
            src="/assets/icons/plus.svg"
            alt="plus"
            width={14}
            height={14}
            className="mr-1"
          />
          <div className="paragraph-4-medium text-white-100">Create Post</div>
        </Button>
        <div className="relative flex min-h-[36px] w-[235px] grow items-center gap-1 rounded-xl bg-black-700 px-4">
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={13}
            height={13}
            className="cursor-pointer"
          />
          <Input
            className="paragraph-4-medium cursor-pointer border-none bg-black-700 text-white-500 focus:outline-none"
            placeholder="Search..."
          />
          <Image
            src="/assets/icons/shortcut.svg"
            alt="close"
            width={18}
            height={18}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="mb-6 h-[1px] w-[235px] bg-white-500"></div>
      <div>
        <h4 className="text-[10px] font-normal text-white-500">POST</h4>
      </div>
    </div>
  );
};

export default LeftSideBar;
