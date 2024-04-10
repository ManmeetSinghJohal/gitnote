"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import Post, { IPost, IPostWithTags } from "@/database/post.model";
import Tag from "@/database/tag.model";

import { connectToDatabase } from "../mongoose";

import { CreatePostParams } from "./shared.types";
import { queryTags } from "./tag.actions";
import { getActiveUser } from "./user.action";

export async function updatePost(id: string, values: CreatePostParams) {
  try {
    await connectToDatabase();
    const user = await getActiveUser();
    const post = await Post.findById(id);
    if (post?.ownerId.toString() !== user.id)
      throw new Error("You are not the owner of this post");

    const {
      title,
      createType,
      tags,
      description,
      checkList,
      code,
      content,
      resources,
    } = values;

    const tagIds = await queryTags(tags);

    const checkListAsStringArray = checkList.map((item) => item.step_lesson);

    await Post.updateOne(
      { _id: id },
      {
        title,
        createType,
        tags: tagIds,
        description,
        checkList: checkListAsStringArray,
        code,
        content,
        resources,
      }
    );

    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
    throw new Error("Error updating post");
  }
}

export async function createPost(params: CreatePostParams) {
  try {
    await connectToDatabase();

    const user = await getActiveUser();

    const {
      title,
      createType,
      tags,
      description,
      checkList,
      code,
      content,
      resources,
    } = params;

    const tagIds = await queryTags(tags);

    const checkListAsStringArray = checkList.map((item) => item.step_lesson);

    const post = await Post.create({
      title,
      createType,
      tags: tagIds,
      description,
      checkList: checkListAsStringArray,
      code,
      content,
      resources,
      ownerId: user.id,
    });

    revalidatePath("/dashboard");
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error(error);
    throw new Error("Error creating post");
  }
}

export async function getPosts() {
  try {
    await connectToDatabase();
    const user = await getActiveUser();
    const filterObject: FilterQuery<IPost> = { ownerId: user.id };
    const posts = await Post.find(filterObject).sort( {createdAt: -1 }).limit(5)
    return posts;
  } catch (error) {
    console.log("Error getting posts", error);
  }
}

export async function getPost(postId: string) {
  try {
    await connectToDatabase();
    const user = await getActiveUser();
    const filterObject: FilterQuery<IPost> = { ownerId: user.id };
    filterObject._id = postId;
    const post = await Post.findOne(filterObject).populate("tags");
    return post;
  } catch (error) {
    console.log("Error getting posts", error);
  }
}

export async function deletePost(postId: string) {
  try {
    await connectToDatabase();
    const user = await getActiveUser();
    const post = await Post.findById(postId);
    if (post?.ownerId.toString() !== user.id)
      throw new Error("You are not the owner of this post");

    await Post.deleteOne({ _id: postId });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error deleting post", error);
    throw new Error("Error deleting post");
  }
}

export async function getPostsCountPerDayForUser() {
  try {
    await connectToDatabase();
    const user = await getActiveUser();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const posts = await Post.find({
      ownerId: user.id,
      createdAt: { $gte: oneYearAgo, $lte: new Date() },
    }).select("createdAt");

    return JSON.parse(JSON.stringify(posts)) as IPostWithTags[];
  } catch (error) {
    console.error("Error getting posts count per day for user", error);
    throw error;
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
      if (tagToUse) {
        filterObject.tags = tagToUse._id;
      }
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
