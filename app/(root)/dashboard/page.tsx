"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";

import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div className="h-full">
      <div className="space-y-[10px]">
        <div className="display-1-bold text-white-100">
          Hello {session?.user?.name},
        </div>
        <div>
          <p className="paragraph-1-regular">
            Time to jot down your latest learnings today!
          </p>
        </div>
      </div>
      <div className="relative mt-[20px] h-[132px] w-full lg:mt-[30px]">
        <Image
          src="/assets/icons/layout.png"
          alt="layout"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div>
        <div className="mt-[30px] items-center justify-between lg:mt-[36px] lg:flex">
          <div className="display-2-bold  mb-5 text-white-100 lg:mb-0">
            Recent Posts
          </div>
          <div className="flex gap-[14px]">
            <Badge className="flex gap-[5px]">
              <Image
                src="/assets/icons/workflow.svg"
                alt="workflow"
                width={16}
                height={16}
              />
              <div className="text-sm text-primary1-500">WorkFlow</div>
            </Badge>
            <Badge className="flex gap-[5px]">
              <Image
                src="/assets/icons/component.svg"
                alt="Component"
                width={16}
                height={16}
              />
              <div className="text-sm text-purple-500">Component</div>
            </Badge>
            <Badge className="flex gap-[5px]">
              <Image
                src="/assets/icons/knowledge.svg"
                alt="knowledge"
                width={16}
                height={16}
              />
              <div className="text-sm text-green-500">Knowledge</div>
            </Badge>
          </div>
        </div>
        <div className="mt-5 lg:mt-6"></div>
      </div>
    </div>
  );
};

export default Dashboard;
