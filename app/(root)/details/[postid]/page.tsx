"use server";
import { redirect } from "next/navigation";
import React from "react";

import { getPost } from "@/lib/actions/post.action";

const DetailsPage = async ({ params }: { params: { postid: string } }) => {
  const post = await getPost(params.postid);

  if (!post) return redirect("/");

  return (
    <div>
      <div className="text-white-100">ID: {post.id}</div>
      <div className="text-primary1-500">Title: {post.title}</div>
    </div>
  );
};

export default DetailsPage;
