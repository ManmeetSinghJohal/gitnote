"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { getFilteredPosts } from "@/lib/actions/post.action";

const Dashboard = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [allPostsWithTag, setAllPostsWithTag] = useState([]);

  const postsWithTag = searchParams.get("tag");

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getFilteredPosts(postsWithTag as string);
      setAllPostsWithTag(posts);
    };
    fetchPosts();
  }, [postsWithTag]);

  const renderPosts = JSON.parse(JSON.stringify(allPostsWithTag));

  function getCreateTypeTextColor(createType) {
    switch (createType) {
      case "component":
        return "text-purple-500";
      case "workFlow":
        return "text-primary1-500";
      case "knowledge":
        return "text-green-500";
      default:
        return "text-primary1-500";
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
      <div className="relative mt-[20px] h-[132px] lg:mt-[30px]">
        <Image
          src="/assets/icons/layout.png"
          alt="layout"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div>
        <div className="mb-[26px] mt-[30px] items-center justify-between lg:mb-5 lg:mt-[36px] lg:flex">
          <div className="display-2-bold  mb-5 text-white-100 lg:mb-0">
            Recent Posts
          </div>
          <div className="flex space-x-[14px]">
            <Badge className="space-x-[5px]">
              <Image
                src="/assets/icons/workflow.svg"
                alt="workflow"
                width={16}
                height={16}
              />
              <div className="text-sm text-primary1-500">WorkFlow</div>
            </Badge>
            <Badge className="space-x-[5px]">
              <Image
                src="/assets/icons/component.svg"
                alt="Component"
                width={16}
                height={16}
              />
              <div className="text-sm text-purple-500">Component</div>
            </Badge>
            <Badge className="space-x-[5px]">
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
        {renderPosts.map((post) => (
          <div
            key={post._id + Math.random()}
            className="mt-5 flex flex-col bg-black-800 px-[18px] py-6 lg:mt-6"
          >
            <div>
              <Badge className="mb-[18px] space-x-[5px]">
                <Image
                  src={`/assets/icons/${post.createType}.svg`}
                  alt="workflow"
                  width={16}
                  height={16}
                />
                <div
                  className={`text-sm ${getCreateTypeTextColor(post.createType)}`}
                >
                  {capitalizeFirstLetter(post.createType)}
                </div>
              </Badge>
            </div>
            <h4 className="heading-1-medium mb-4 text-white-100">
              {post.title}
            </h4>
            <div className="space-x-[10px]">
              {post.tags.map((tag) => (
                <Badge
                  key={tag + Math.random()}
                  variant="secondary"
                  className="paragraph-3-medium bg-black-700 text-white-300"
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
