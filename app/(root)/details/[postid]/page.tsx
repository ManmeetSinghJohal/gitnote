"use server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import Preview from "@/components/Preview";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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

      {post.createType === "knowledge" && (
        <div className="mt-[40px]">
          <div className="paragraph-1-bold mb-2.5 text-white-100">
            Key Takeaways
          </div>

          <div className="space-y-2">
            {post.checkList.map((check, i) => (
              <div className="flex space-x-1.5" key={i}>
                <Image
                  src="/assets/icons/checkMarkGreen.svg"
                  alt="check"
                  width={15}
                  height={15}
                />
                <div className="paragraph-2-regular">{check.toString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div
        className="paragraph-2-regular prose prose-invert mt-[54px]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.createType === "workflow" && (
        <div className="mt-5">
          <div className="paragraph-2-bold mb-2.5 text-white-100">
            Task Checklist
          </div>
          <div className="space-y-2">
            {post.resources.map((resource, i) => (
              <div className="flex items-center space-x-1.5" key={i}>
                <Checkbox id={resource.label} />
                <label className="paragraph-2-regular" htmlFor={resource.label}>{resource.label}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5">
        <div className="paragraph-2-bold mb-2.5 text-white-100">
          Resources & Links
        </div>
        <div className="space-y-2">
          {post.resources.map((resource, i) => (
            <div className="flex space-x-1.5" key={i}>
              <Image
                src="/assets/icons/checkMarkGreen.svg"
                alt="check"
                width={15}
                height={15}
              />
              <Link
                href={`http://${resource.resource}`}
                className="paragraph-2-regular"
                target="_blank"
                rel="noopener noreferrer"
              >
                {resource.label}
              </Link>
              <Image
                src="/assets/icons/icn-external-link.svg"
                alt="check"
                width={15}
                height={15}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
