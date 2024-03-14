"use server";

import Post from "@/database/post.model";

import { connectToDatabase } from "../mongoose";

import { CreatePostParams } from "./shared.types";

export async function createPost(params: CreatePostParams) {
  try {
    await connectToDatabase();

    const {
      title,
      createType,
      description,
      checkList,
      code,
      content,
      resources,
      tags,
    } = params;

  const checkListAsStringArray = checkList.map((item) => item.step_lesson);

    const post = await Post.create({
      title,
      createType,
      description,
      checkList: checkListAsStringArray,
      code,
      content,
      resources,
      tags,
    });

    console.log("Post created: ", post);
    return JSON.stringify(post);
  } catch (error) {
    console.error(error);
    throw new Error("Error creating post");
  }
}

export async function getPosts() {
  try {
    await connectToDatabase();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log("Error getting posts", error);
  }
}