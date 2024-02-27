import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";

import CreateUserForm from "@/components/auth/CreateUserForm";

import { authOptions } from "../api/auth/[...nextauth]/route";

const Signup = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  
  return (
    <div className="flex justify-center p-10">
      <div className="flex w-96 flex-col gap-2">
        <h1>Create Account</h1>
        <CreateUserForm />
        <Link className="mt-3 text-right text-sm" href={"/"}>
          Already have an account? <span className="underline">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
