import { redirect } from "next/navigation";
import React from "react";

import CreatePostForm from "@/components/forms/CreatePostForm";
import { getPost } from "@/lib/actions/post.action";
import { getTags } from "@/lib/actions/tag.actions";
import { ParamsProps } from "@/types";

const EditPost = async ({ params }: ParamsProps) => {
  const post = await getPost(params.postid);
  const postTags = await getTags();
  
  if (!post) return redirect("/");

  return (
    <div className="text-white-100">
      <div className="display-1-bold mb-[30px] text-white-100 lg:mb-10">
        Edit a Post
      </div>
      <div className="paragraph-3-medium mb-6 text-white-500">
        BASIC INFORMATION
      </div>
      <CreatePostForm
        postTags={JSON.parse(postTags ?? "")}
        post={JSON.parse(JSON.stringify(post))}
      />
    </div>
  );
};

export default EditPost;
