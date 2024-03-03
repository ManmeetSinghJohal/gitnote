import React from "react";

import CreatePostForm from "@/components/forms/CreatePostForm";

const CreatePost = () => {
  return (
    <div className="text-white-100">
      <div className="display-1-bold mb-[30px] text-white-100 lg:mb-10">
        Create a Post
      </div>
      <div className="paragraph-3-medium mb-6 text-white-500">
        BASIC INFORMATION
      </div>
      <CreatePostForm />
    </div>
  );
};

export default CreatePost;
