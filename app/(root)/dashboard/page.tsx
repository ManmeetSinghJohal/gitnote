"use client";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPost } from "@/database/post.model";
import { getFilteredPosts } from "@/lib/actions/post.action";

const Dashboard = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [postsData, setPostsData] = useState<{
    posts: IPost[];
    pageCount: number;
  }>({ posts: [], pageCount: 1 });

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

  const postsWithTag = searchParams.get("tag");
  const postsWithCreateType = searchParams.get("createType");
  const pageNumber = parseInt(searchParams.get("page") || "0");
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      const postsAndCount = await getFilteredPosts(
        postsWithTag as string,
        postsWithCreateType as string,
        pageNumber,
        postsPerPage
      );
      if (!postsAndCount) return;

      setPostsData(postsAndCount);
    };
    fetchPosts();
  }, [postsWithTag, postsWithCreateType, pageNumber, postsPerPage]);

  const renderPosts = postsData.posts;
  const totalPages = postsData.pageCount;

  function getCreateTypeColor(createType: string) {
    const colorMap: { [key: string]: string } = {
      component: "text-purple-500 bg-purple-500/10",
      workFlow: "text-primary1-500 bg-primary1-500/10",
      knowledge: "text-green-500 bg-green-500/10",
    };

    return colorMap[createType] || "text-primary1-500 bg-primary1-500/10";
  }

  function capitalizeFirstLetter(string: string): string {
    return string ? `${string.charAt(0).toUpperCase()}${string.slice(1)}` : "";
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
            <Badge
              className="space-x-[5px] bg-primary1-500/10"
              onClick={() => applyFilter("createType", "workflow")}
            >
              <Image
                src="/assets/icons/workflow.svg"
                alt="workflow"
                width={16}
                height={16}
              />
              <div className="text-sm text-primary1-500">WorkFlow</div>
            </Badge>
            <Badge
              className="space-x-[5px] bg-purple-500/10"
              onClick={() => applyFilter("createType", "component")}
            >
              <Image
                src="/assets/icons/component.svg"
                alt="Component"
                width={16}
                height={16}
              />
              <div className="text-sm text-purple-500">Component</div>
            </Badge>
            <Badge
              className="space-x-[5px] bg-green-500/10"
              onClick={() => applyFilter("createType", "knowledge")}
            >
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
        {renderPosts.map((post: IPost) => (
          <div
            key={nanoid()}
            className="mt-5 flex flex-col bg-black-800 px-[18px] py-6 lg:mt-6"
          >
            <div>
              <Badge
                className={`mb-[18px] space-x-[5px] ${getCreateTypeColor(post.createType)}`}
              >
                <Image
                  src={`/assets/icons/${post.createType}.svg`}
                  alt="workflow"
                  width={16}
                  height={16}
                />
                <div className="text-sm">
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
                  key={tag._id}
                  variant="secondary"
                  className="paragraph-3-medium bg-black-700 text-white-300"
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>
        ))}

        <div className="paragraph-4-medium mt-10 flex items-center justify-center gap-4 text-white-100">
          <Button
            type="button"
            onClick={() => applyFilter("page", pageNumber - 1 + "")}
            disabled={pageNumber === 0}
            className="bg-black-700 px-3.5 py-2.5"
          >
            Prev
          </Button>
          <div className="paragraph-3-medium mx-8">
            <span>
              {pageNumber + 1}/{totalPages}
            </span>
          </div>
          <Button
            type="button"
            onClick={() => applyFilter("page", pageNumber + 1 + "")}
            disabled={pageNumber + 1 === totalPages}
            className="bg-black-700 px-3.5 py-2.5"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

