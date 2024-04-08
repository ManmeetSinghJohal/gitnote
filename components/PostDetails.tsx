"use client";

import parse, { domToReact } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";

import { useToast } from "@/components/ui/use-toast";
import { IPostWithTagsAndResources } from "@/database/post.model";

import ParseHTML from "./shared/ParseHTML";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { CreateTypeBadge } from "./ui/createTypeBadge";

const PostDetails = ({ post }: { post: IPostWithTagsAndResources }) => {
  const { toast } = useToast();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
    });
  };

  const transformNode = (node, index) => {
    if (node.type === "tag" && node.name === "pre") {
      const updatedAttributes = {
        ...node.attribs,
        class: `${node.attribs.class || ""} relative`,
      };
      const children = node.children.map((childNode, childIndex) => {
        if (childNode.type === "tag" && childNode.name === "code") {
          const codeContent = childNode.children.find(
            (child) => child.type === "text"
          )?.data;
          return (
            <div key={childIndex} style={{ position: "relative" }}>
              <code>{domToReact(childNode.children)}</code>
              <button
                onClick={() => copyCode(codeContent)}
                className="absolute right-0 top-0 rounded-sm bg-black-800"
              >
                <Image
                  src="/assets/icons/copy.svg"
                  alt="Copy Code Block"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          );
        }
        return domToReact(childNode);
      });

      return <pre {...updatedAttributes}>{children}</pre>;
    }
  };

  return (
    <div className="h-full">
      <div className="">
        <div className="sm:flex sm:justify-between">
          <div className="display-2-bold mb-2.5 text-white-100">
            {post.title}
          </div>
          <Link
            href={`/post/${post._id}`}
            className="flex h-6 justify-between sm:space-x-2.5"
          >
            <CreateTypeBadge
              variant={post.createType}
              className=" flex justify-center space-x-[5px] sm:ml-2"
            />
            <Image
              src="/assets/icons/more.svg"
              alt="more"
              width={16}
              height={16}
            />
          </Link>
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
          <ParseHTML data={post.code} />
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
