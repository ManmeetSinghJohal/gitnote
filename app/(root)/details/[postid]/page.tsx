"use server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import Preview from "@/components/Preview";
import { Badge } from "@/components/ui/badge";
import { CreateTypeBadge } from "@/components/ui/createTypeBadge";
import { getPost } from "@/lib/actions/post.action";

const DetailsPage = async ({ params }: { params: { postid: string } }) => {
  const post = await getPost(params.postid);

  if (!post) return redirect("/");

  return (
    <div className="h-full">
      <div className="">
        <div className="sm:flex sm:justify-between">
          <div className="display-2-bold mb-2.5 text-white-100">
            {post.title}
          </div>
          <div className="flex h-6 justify-between sm:space-x-2.5">
            <CreateTypeBadge
              variant={post.createType}
              className="space-x-[5px]"
            />
            <Image
              src="/assets/icons/more.svg"
              alt="more"
              width={16}
              height={16}
            />
          </div>
        </div>
        <div className="paragraph-3-regular mt-5">{post.description}</div>
        <div className="mt-7 flex space-x-3.5 lg:mt-5">
          <div className="flex items-center space-x-1">
            <div>
              <Image
                src="/assets/icons/calander.svg"
                alt="calander"
                width={14}
                height={14}
              />
            </div>
            <div className="paragraph-3-regular">
              {post.createdAt.toISOString().split("T")[0]}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div>
              <Image
                src="/assets/icons/calander.svg"
                alt="calander"
                width={14}
                height={14}
              />
            </div>
            <div className="paragraph-3-regular">10.2k stars</div>
          </div>
          <div className="flex items-center space-x-1">
            <div>
              <Image
                src="/assets/icons/calander.svg"
                alt="calander"
                width={14}
                height={14}
              />
            </div>
            <div className="paragraph-3-regular">129k views</div>
          </div>
        </div>
        <div className="mt-6 space-x-3">
          {post.tags.map(
            (tag) => (
              console.log(tag),
              (
                <Badge
                  key={tag._id}
                  variant="secondary"
                  className="paragraph-3-medium bg-black-700 capitalize text-white-300"
                >
                  {tag.label}
                </Badge>
              )
            )
          )}
        </div>
      </div>
      {post.createType === "component" && (
        <div className="mt-[40px]">
          <Preview code={post.code} />
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
