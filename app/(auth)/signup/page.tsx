import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";

import CreateUserForm from "@/components/auth/CreateUserForm";

const SignUp = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="grid h-screen place-items-center">
      <div className="flex max-w-96 flex-col gap-2 rounded-lg border-t-4 border-black-600 p-5 shadow-lg">
        <h1>Create Account</h1>
        <CreateUserForm />
        <Link className="mt-3 text-right text-sm" href={"/signin"}>
          Already have an account? <span className="underline">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
