"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import Post, { IPost, IPostWithTags } from "@/database/post.model";
import Tag from "@/database/tag.model";

import { connectToDatabase } from "../mongoose";

import { CreatePostParams } from "./shared.types";
import { queryTags } from "./tag.actions";
import { getActiveUser } from "./user.action";

export async function createPost(params: CreatePostParams) {
  try {
    await connectToDatabase();

    const user = await getActiveUser();

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

    const tagIds = await queryTags(tags);

    const checkListAsStringArray = checkList.map((item) => item.step_lesson);

    const post = await Post.create({
      title,
      createType,
      description,
      checkList: checkListAsStringArray,
      code,
      content,
      resources,
      tags: tagIds,
      ownerId: user.id,
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
    const user = await getActiveUser();
    const filterObject: any = { ownerId: user.id };
    const posts = await Post.find(filterObject);
    return posts;
  } catch (error) {
    console.log("Error getting posts", error);
  }
}

export async function getFilteredPosts(
  tag?: string,
  createType?: string,
  page: number = 0,
  postsPerPage: number = 5
) {
  try {
    await connectToDatabase();

    const user = await getActiveUser();

    const filterObject: FilterQuery<IPost> = { ownerId: user.id };
    if (tag) {
      const tagToUse = await Tag.findOne({ value: tag });
      filterObject.tags = tagToUse._id;
    }

    if (createType) {
      filterObject.createType = createType;
    }

    const posts = await Post.find(filterObject)
      .populate("tags")
      .skip(page * postsPerPage)
      .limit(postsPerPage);

    const itemCount = await Post.countDocuments(filterObject);

    return {
      posts: JSON.parse(JSON.stringify(posts)) as IPostWithTags[],
      pageCount: Math.ceil(itemCount / postsPerPage),
    };
  } catch (error) {
    console.log("Error getting posts with tag", error);
  }
}
