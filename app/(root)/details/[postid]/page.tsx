"use server";

import { redirect } from "next/navigation";
import React from "react";

import PostDetails from "@/components/PostDetails";
import { getPost } from "@/lib/actions/post.action";
import { ParamsProps } from "@/types";

const DetailsPage = async ({ params }: ParamsProps) => {
  const post = await getPost(params.postid);

  if (!post) return redirect("/");

  return <PostDetails post={JSON.parse(JSON.stringify(post))} />;
};

export default DetailsPage;
