import Image from "next/image";
import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PostParams } from "@/lib/actions/shared.types";

import LeftSideBar from "./LeftSideBar";
import Logo from "./Logo";

const Navbar = ({ posts }: { posts: PostParams[] }) => {
  return (
    <div className="h-[70px] bg-black-800">
      <div className="flex items-center justify-between px-[18px] py-6">
        <Logo textSize="text-2xl" width={20} height={24} />
        <Sheet>
          <SheetTrigger asChild>
            <Image
              src="/assets/icons/hamburger.svg"
              alt="hamburger"
              width={21}
              height={18}
              className=""
            />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[290px] border-none bg-black-800 lg:hidden"
          >
            <LeftSideBar posts={posts} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
