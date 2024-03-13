"use server";

import Post from "@/database/post.model";
import Tag from "@/database/tag.model";

import { connectToDatabase } from "../mongoose";

import { CreatePostParams } from "./shared.types";

export async function createPost(params: CreatePostParams) {
  try {
    await connectToDatabase();

    const {
      title,
      createType,
      description,
      learned,
      content,
      resources,
      tags,
    } = params;

    const post = await Post.create({
      title,
      createType,
      description,
      learned,
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