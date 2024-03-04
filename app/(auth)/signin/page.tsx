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
    <div className="mt-16 w-full max-w-[400px] lg:mt-[100px]">
      <div className="flex flex-col gap-2">
        <h1 className="display-2-bold mb-[22px] text-white-100">Login</h1>
        <LoginForm />
        <Link
          className="paragraph-3-medium mt-3 text-center underline"
          href={"/signup"}
        >
          I don&apos;t have an account?
        </Link>
        <div className="paragraph-4-regular my-[22px] text-center">or</div>
        {providers && <LoginButton providers={providers} />}
      </div>
    </div>
  );
};

export default SignIn;
