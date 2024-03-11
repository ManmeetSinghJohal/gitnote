"use server";

import Tag, { ITag } from "@/database/tag.model";

import { connectToDatabase } from "../mongoose";

export async function getTags() {
  try {
    await connectToDatabase();
    const tags = await Tag.find();
    return tags;
  } catch (error) {
    console.log("Error getting tags", error);
  }
}

export async function queryTags(tags: { value: string }[]): Promise<string[]> {
    const tagsArray: string[] = [];
  try {
    await connectToDatabase();
    for (const tag of tags) {
      let foundTag = await Tag.findOne({ value: tag.value });
      if (!foundTag) {
        foundTag = await Tag.create(tag);
        console.log("newTagid", foundTag._id);
      }
      tagsArray.push(foundTag._id.toString())

      console.log("tagsArray", tagsArray);
    }
  } catch (error) {
    console.log("Error querying tags", error);
  }
  return tagsArray;
}
