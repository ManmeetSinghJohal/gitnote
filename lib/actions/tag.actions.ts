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

export async function createTag(tag: ITag) {
    try {
        await connectToDatabase();
        const tag = await Tag.create(tag);
        await tag.save();
    } catch (error) {
        console.log("Error creating tag", error);
    }
}