import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import React from "react";

import LoginButton from "@/components/auth/LoginButton";
import LoginForm from "@/components/auth/LoginForm";

const SignIn = async () => {
  const session = await getServerSession();
  const providers = await getProviders();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex max-w-96 flex-col gap-2 rounded-lg border-t-4 border-black-600 p-5 shadow-lg">
        <h1 className="my-4 text-xl font-bold">Login</h1>
        <LoginForm />
        <Link className="mt-3 text-right text-sm" href={"/signup"}>
          Don&apos;t have an account?{" "}
          <span className="underline">Register</span>
        </Link>
        {providers && <LoginButton providers={providers} />}
      </div>
    </div>
  );
};

export default SignIn;
