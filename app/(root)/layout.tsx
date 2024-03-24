import React from "react";

import LeftSideBar from "@/components/shared/LeftSideBar";
import Navbar from "@/components/shared/Navbar";
import RightSideBar from "@/components/shared/RightSideBar";
import { Toaster } from "@/components/ui/toaster";
import { getPosts } from "@/lib/actions/post.action";
import { getTags } from "@/lib/actions/tag.actions";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const postTags = await getTags();
  const posts = await getPosts();
  return (
    <main className="relative">
      <div className="lg:hidden">
        <Navbar posts={JSON.parse(JSON.stringify(posts))}/>
      </div>
      <div className="flex">
        <div className="hidden lg:flex">
          <LeftSideBar posts={JSON.parse(JSON.stringify(posts))} />
        </div>
        <section className="flex min-h-full flex-1 bg-black-900">
          <div className="w-full px-5 py-[30px] lg:px-[30px] lg:py-10">
            {children}
          </div>
        </section>
        <div className="hidden xl:flex">
          <RightSideBar postTags={JSON.parse(postTags ?? "")} />
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
