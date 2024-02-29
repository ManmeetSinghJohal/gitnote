import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bycrpy from "bcryptjs";
import { Account, User as AuthUser } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import User from "@/database/user.model";
import clientPromise from "@/lib/mongodb";
import { connectToDatabase } from "@/lib/mongoose";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      profile(profile) {
        // console.log("profile", profile);
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profile(profile) {
        // console.log("profile", profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          await connectToDatabase();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bycrpy.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile }: { user: AuthUser; account: Account; profile: any }) {
      await connectToDatabase(); // Ensure the database connection is established
      
      if(account.provider === "credentials") {  
        return true;
      }

      if (account.provider === "github" || account.provider === "google") {
        // For OAuth providers, `user` might not have all the information, so use `profile` instead
        const email = profile.email;
        let userDoc = await User.findOne({ email });

        if (!userDoc) {
          // Create a new user if one doesn't exist
          userDoc = new User({
            email,
            name: profile.name,
          });
          await userDoc.save();
        } else {
          // Update existing user information if necessary
          // For example, update the profile picture if it has changed
        }
      }
      return true; // Return true to allow the sign-in
    },
  },
  session: {
    strategy: "jwt",
  },
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  // },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
