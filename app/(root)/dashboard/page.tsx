"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateTypeBadge } from "@/components/ui/createTypeBadge";
import { createTypeNames } from "@/constants";
import { IPostWithTags } from "@/database/post.model";
import {
  getFilteredPosts,
  getPostsCountPerDayForUser,
} from "@/lib/actions/post.action";

type CreatedAtData = {
  _id: string;
  createdAt: string;
};

const Dashboard = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [postsData, setPostsData] = useState<{
    posts: IPostWithTags[];
    pageCount: number;
  }>({ posts: [], pageCount: 1 });
  const [createdAtData, setCreatedAtData] = useState<CreatedAtData[]>([]);
  const postsWithTag = searchParams.get("tag");
  const postsWithCreateType = searchParams.get("createType");
  const pageNumber = parseInt(searchParams.get("page") || "0");
  const postsPerPage = 5;
  const renderPosts = postsData.posts;
  const totalPages = postsData.pageCount;
  const endDate = new Date();
  const startDate = new Date();

  useEffect(() => {
    const fetchCreatedAt = async () => {
      const createdData = await getPostsCountPerDayForUser();
      if (!createdData) return;

      setCreatedAtData(createdData);
    };
    fetchCreatedAt();
  }, []);

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

  const postCountsPerDay = createdAtData.reduce((acc: {date: string; count: number}[], post) => {
    const date = post.createdAt.split("T")[0];
    const existingEntry = acc.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []);

  console.log(postCountsPerDay)

  const applyFilter = (type: string, value: string) => {
    const mySearchParams = new URLSearchParams(searchParams.toString());

    mySearchParams.set("page", "0");

    if (mySearchParams.get(type) === value) {
      mySearchParams.delete(type);
      router.replace("/dashboard?" + mySearchParams.toString());
      return;
    } else {
      mySearchParams.set(type, value);
    }

    router.replace("/dashboard?" + mySearchParams.toString());
  };

  return (
    <div className="h-full">
      <div className="mb-[52px] space-y-[10px]">
        <div className="display-1-bold text-white-100">
          Hello {session?.user?.name},
        </div>
        <div>
          <p className="paragraph-1-regular">
            Time to jot down your latest learnings today!
          </p>
        </div>
      </div>
      <CalendarHeatmap
        startDate={startDate.setFullYear(endDate.getFullYear() - 1)}
        endDate={endDate}
        showWeekdayLabels={false}
        showOutOfRangeDays={true}
        gutterSize={5}
        tooltipDataAttrs={(value: {date: string, count: number}) => {
          if (!value?.date) {
            return null;
          }

          return {
            "data-tooltip-id": "my-tooltip",
            "data-tooltip-content": `${value.date} has count: ${value.count}`,
          };
        }}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return "color-github-0";
          }

          const thresholds = [1, 10, 20, 50];

          let className = "color-github-";
          if (value.count >= thresholds[3]) {
            className += "4";
          } else if (value.count >= thresholds[2]) {
            className += "3";
          } else if (value.count >= thresholds[1]) {
            className += "2";
          } else if (value.count >= thresholds[0]) {
            className += "1";
          } else {
            className += "0";
          }

          return className;
        }}
        values={postCountsPerDay}
      />
      <Tooltip id="my-tooltip" />
      <div>
        <div className="mb-[26px] mt-[30px] items-center justify-between lg:mb-5 lg:mt-[36px] lg:flex">
          <div className="display-2-bold  mb-5 text-white-100 lg:mb-0">
            Recent Posts
          </div>
          <div className="flex space-x-[14px]">
            {createTypeNames.map((badge) => (
              <CreateTypeBadge
                key={badge.createType}
                variant={badge.createType}
                className="space-x-[5px]"
                onClick={() => applyFilter("createType", badge.createType)}
              />
            ))}
          </div>
        </div>
        {renderPosts.map((post) => (
          <Link key={post._id} href={`/details/${post._id}`}>
            <div className="mt-5 flex flex-col bg-black-800 px-[18px] py-6 lg:mt-6">
              <div>
                <CreateTypeBadge
                  variant={post.createType}
                  className="space-x-[5px]"
                />
              </div>
              <h4 className="heading-1-medium my-4 ml-1 text-white-100">
                {post.title}
              </h4>
              <div className="space-x-[10px]">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag._id}
                    variant="secondary"
                    className="paragraph-3-medium bg-black-700 capitalize text-white-300"
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        ))}

        {totalPages === 0 && (
          <div className="paragraph-4-medium mt-10 flex items-center justify-center gap-4 text-white-100">
            Create your first post.
          </div>
        )}

        {totalPages > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
