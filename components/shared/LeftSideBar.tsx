"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import React from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import Logo from "./Logo";
import UserDetails from "./UserDetails";

const LeftSideBar = () => {
  return (
    <div className="w-[290px] bg-black-800 pt-10 lg:px-7 ">
      <div className="mb-12 hidden lg:flex">
        <Logo />
      </div>
      <div className="mt-[-40px] lg:hidden">
        <UserDetails />
      </div>
      <div className="space-y-4">
        <Link href="/createpost">
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
        </Link>
        <div className="relative flex min-h-[36px] w-[235px] grow items-center gap-1 rounded-lg bg-black-700 px-4">
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
      <div className="my-6 h-[1px] w-[235px] bg-white-500"></div>
      <div>
        <h4 className="mb-5 text-[10px] font-normal text-white-500">POST</h4>
        <div>
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/workflow.svg"
                alt="workflow"
                width={16}
                height={16}
              />
              <h4 className="paragraph-3-medium">Project Setup</h4>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/workflow.svg"
                alt="workflow"
                width={16}
                height={16}
              />
              <h4 className="paragraph-3-medium">NextAuth OAuth Setup</h4>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/component.svg"
                alt="component"
                width={16}
                height={16}
              />
              <h4 className="paragraph-3-medium">Mobile Navigation</h4>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/component.svg"
                alt="component"
                width={16}
                height={16}
              />
              <h4 className="paragraph-3-medium">Header</h4>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/component.svg"
                alt="component"
                width={16}
                height={16}
              />
              <h4 className="paragraph-3-medium">Modal</h4>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/component.svg"
                alt="component"
                width={16}
                height={16}
              />
              <h4 className="paragraph-3-medium">Search Command</h4>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/knowledge.svg"
                alt="knowledge"
                width={16}
                height={16}
              />
              <h4 className="paragraph-3-medium">Design System</h4>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/knowledge.svg"
                alt="knowledge"
                width={16}
                height={16}
              />
              <h4 className="paragraph-3-medium">Naming Convention</h4>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/knowledge.svg"
                alt="knowledge"
                width={16}
                height={16}
              />
              <h4 className="paragraph-3-medium">Best Practices</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 h-[1px] w-[235px] bg-white-500"></div>
      <div>
        <h4 className="mb-5 text-[10px] font-normal text-white-500">
          QUICK LINKS
        </h4>
        <div>
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/jsm.svg"
                alt="jsm icon"
                width={22}
                height={16}
              />
              <h4 className="paragraph-3-medium">JSM Courses</h4>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/github.svg"
                alt="github"
                width={16}
                height={16}
              />
              <h4 className="paragraph-3-medium">GitHub Organization</h4>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hover: mt-[194px] flex cursor-pointer items-center gap-3"
        onClick={() => signOut()}
      >
        <Image
          src="/assets/icons/logout.svg"
          alt="logout"
          width={20}
          height={20}
        />
        <h4 className="paragraph-3-medium">Logout</h4>
      </div>
    </div>
  );
};

export default LeftSideBar;
