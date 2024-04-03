"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

import { IPostWithTagsAndResources } from "@/database/post.model";

import Preview from "./Preview";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { CreateTypeBadge } from "./ui/createTypeBadge";

function decodeHtmlEntities(input) {
  const txt = document.createElement("textarea");
  txt.innerHTML = input;
  return txt.value;
}

const PostDetails = ({ post }: { post: IPostWithTagsAndResources }) => {
  console.log("post", post);

  useEffect(() => {
    const allPres = document.querySelectorAll("pre");
    allPres.forEach((pre) => {
      pre.style.position = "relative";

      const tickImg = document.createElement("img");
      tickImg.src = "/assets/icons/tick-gray.svg";
      tickImg.style.height = "16px";
      tickImg.style.width = "16px";
      tickImg.style.display = "none";

      const img = document.createElement("img");
      img.src = "/assets/icons/copy.svg";
      img.style.height = "16px";
      img.style.width = "16px";

      const button = document.createElement("button");
      button.appendChild(img);
      button.appendChild(tickImg);
      button.style.position = "absolute";
      button.style.top = "0";
      button.style.right = "0";
      button.style.padding = "20px";

      const codeBlockInThePre = pre.children[0];

      button.onclick = () => {
        navigator.clipboard.writeText(
          decodeHtmlEntities(
            codeBlockInThePre.innerHTML.replace(/<[^>]*>/g, "")
          )
        );
        img.style.display = "none";
        tickImg.style.display = "block";
        setTimeout(() => {
          tickImg.style.display = "none";
          img.style.display = "block";
        }, 5000);
      };
      pre.appendChild(button);
    });
  }, []);

  const postContentWithButton = post.content;

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
        <div
          className="paragraph-2-regular prose prose-invert mt-[54px]"
          dangerouslySetInnerHTML={{ __html: postContentWithButton }}
        />
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