"use client";

import parse from "html-react-parser";
import type { DOMNode } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popoverEdit";
import { IPostWithTagsAndResources } from "@/database/post.model";
import { deletePost } from "@/lib/actions/post.action";

import HighlightedCode from "./shared/HighlightedCode";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { CreateTypeBadge } from "./ui/createTypeBadge";


const PostDetails = ({ post }: { post: IPostWithTagsAndResources }) => {
  const transformNode = (node: DOMNode) => {
    if (node.type === "tag" && node.name === "pre") {
      let codeContent: string | undefined;
      node.children.forEach((childNode) => {
        if (childNode.type === "tag" && childNode.name === "code") {
          const textChild = childNode.children.find(
            (child)=> child.type === "text"
          );
          if(textChild && "data" in textChild)
          codeContent = textChild?.data;
        }
      });

      if (!codeContent) return;

      return <HighlightedCode data={codeContent} />;
    }
  };

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
              className=" flex justify-center space-x-[5px] sm:ml-2"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Image
                  src="/assets/icons/more.svg"
                  alt="more"
                  width={16}
                  height={16}
                  className="hover:cursor-pointer hover:opacity-70 "
                />
              </PopoverTrigger>
              <PopoverContent className="mt-[-10px] w-[220px] bg-transparent text-white-100">
                <div>
                  <div className="flex space-x-2 rounded-t-md bg-black-700 py-2 pl-6 pr-12 hover:bg-black-600">
                    <Image
                      src="/assets/icons/update.svg"
                      alt="update"
                      width={16}
                      height={16}
                    />
                    <Link
                      href={`/post/${post._id}`}
                      className="paragraph-3-medium"
                    >
                      Update Post
                    </Link>
                  </div>
                  <div className="flex space-x-2 rounded-b-md bg-black-700 py-2 pl-6 pr-12 hover:bg-black-600">
                    <Image
                      src="/assets/icons/trash.svg"
                      alt="trash"
                      width={16}
                      height={16}
                    />
                    <Link
                      href={`/dashboard`}
                      className="paragraph-3-medium"
                      onClick={() => {
                        deletePost(post._id);
                      }}
                    >
                      Delete Post
                    </Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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
              {new Date(post.createdAt).toDateString()}
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

      {post.createType === "workflow" && (
        <div className="mt-5">
          <div className="paragraph-2-bold mb-2.5 text-white-100">
            Task Checklist
          </div>
          <div className="space-y-2">
            {post.checkList.map((item, i) => (
              <div className="flex space-x-1.5" key={i}>
                <Checkbox id={`checkbox-${i}`} className="mt-1" />
                <label
                  className="paragraph-2-regular"
                  htmlFor={`checkbox-${i}`}
                >
                  {item.toString()}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {post.createType === "component" && post.code.length > 0 && (
        <div className="mt-[40px]">
          <div className="flex h-9 items-center gap-2">
            <div>
              <Image
                src="/assets/icons/codeArrows.svg"
                alt="code"
                width={16}
                height={16}
              />
            </div>
            <div className="paragraph-3-medium text-white-100">Code</div>
          </div>
          <HighlightedCode data={post.code} />
        </div>
      )}

      {post.createType === "knowledge" && (
        <div className="mt-[40px]">
          <div className="paragraph-1-bold mb-2.5 text-white-100">
            Key Takeaways
          </div>

          <div className="space-y-2">
            {post.checkList.map((check, i) => (
              <div className="flex items-start space-x-1.5" key={i}>
                <Image
                  src="/assets/icons/checkMarkGreen.svg"
                  alt="check"
                  width={15}
                  height={15}
                  className="mt-1.5"
                />
                <div className="paragraph-2-regular">{check.toString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="">
        <div className="paragraph-2-regular mt-[54px]">
          {parse(post.content, {
            replace: transformNode,
          })}
        </div>
      </div>

      <div className="mt-5">
        <div className="paragraph-2-bold mb-2.5 text-white-100">
          Resources & Links
        </div>
        <div className="space-y-2">
          {post.resources.map((resource, i) => (
            <Link
              className="flex space-x-1.5"
              key={i}
              href={`http://${resource.resource}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/icons/checkMarkGreen.svg"
                alt="check"
                width={15}
                height={15}
              />
              <div className="paragraph-2-regular underline decoration-1 underline-offset-4">
                {resource.label}
              </div>
              <Image
                src="/assets/icons/icn-external-link.svg"
                alt="check"
                width={15}
                height={15}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
