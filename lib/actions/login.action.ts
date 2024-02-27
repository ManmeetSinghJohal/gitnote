"use server"

import { connectToDatabase } from "../mongoose";

export async function login(params: any) {
    try {
        await connectToDatabase();
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}