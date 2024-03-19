"use server";

import { revalidatePath } from "next/cache";

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

    revalidatePath("/dashboard");
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

export async function getFilteredPosts(tag?: string, createType?: string) {
  try {
    await connectToDatabase();
    const filterObject: any = {};
    if (tag) {
      const tagToUse = await Tag.findOne({ value: tag });
      filterObject.tags = tagToUse._id;
    }

    if (createType) {
      filterObject.createType = createType;
    }

    const posts = await Post.find(filterObject).populate("tags");

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log("Error getting posts with tag", error);
  }
}
