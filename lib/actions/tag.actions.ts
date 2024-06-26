"use server";

import { FilterQuery } from "mongoose";

import Tag, { ITag } from "@/database/tag.model";

import { connectToDatabase } from "../mongoose";

import { getActiveUser } from "./user.action";

export async function getTags() {
  try {
    await connectToDatabase();
    const user = await getActiveUser();
    const filterObject: FilterQuery<ITag> = { ownerId: user.id };
    const tags = await Tag.find(filterObject);
    return JSON.stringify(tags);
  } catch (error) {
    console.log("Error getting tags", error);
  }
}

export async function queryTags(tags: { value: string }[]): Promise<string[]> {
  const tagsArray: string[] = [];
  try {
    await connectToDatabase();
    const user = await getActiveUser();
    for (const tag of tags) {
      let foundTag = await Tag.findOne({ value: tag.value });
      if (!foundTag) {
        foundTag = await Tag.create({
          value: tag.value,
          label: tag.value,
          ownerId: user.id,
        });
      }
      tagsArray.push(foundTag._id.toString());
    }
  } catch (error) {
    console.log("Error querying tags", error);
  }
  return tagsArray;
}
