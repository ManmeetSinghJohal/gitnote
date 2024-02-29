import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";

export const POST = async (request: Request) => {
  try {
    const { name, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDatabase();
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
};
