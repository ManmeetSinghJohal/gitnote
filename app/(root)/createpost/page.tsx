import React from "react";

import CreatePostForm from "@/components/forms/CreatePostForm";
import { getTags } from "@/lib/actions/tag.actions";

const CreatePost = async () => {
  const postTags = await getTags();

  return (
    <div className="text-white-100">
      <div className="display-1-bold mb-[30px] text-white-100 lg:mb-10">
        Create a Post
      </div>
      <div className="paragraph-3-medium mb-6 text-white-500">
        BASIC INFORMATION
      </div>
      <CreatePostForm postTags={JSON.parse(JSON.stringify(postTags))}/>
    </div>
  );
};

export default CreatePost;
