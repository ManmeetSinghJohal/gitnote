"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/database/user.model";

import { connectToDatabase } from "../mongoose";

import { CreateUserParams } from "./shared.types";

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();
    const { name, email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }
    const newUser = await User.create({ name, email, password });
    return JSON.stringify(newUser);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getActiveUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("You are not logged in!");

  return session.user;
};
