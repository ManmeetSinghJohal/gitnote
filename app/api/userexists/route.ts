import { NextResponse } from "next/server";

import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email } = await request.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
