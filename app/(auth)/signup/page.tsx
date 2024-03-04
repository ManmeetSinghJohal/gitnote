import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import React from "react";

import CreateUserForm from "@/components/auth/CreateUserForm";
import LoginButton from "@/components/auth/LoginButton";

const SignUp = async () => {
  const session = await getServerSession();
  const providers = await getProviders();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="mb-24 mt-16 w-full max-w-[400px] lg:mt-[100px]">
      <div className="flex flex-col gap-2">
        <h1 className="display-2-bold mb-[22px] text-white-100">
          Create an Account
        </h1>
        <CreateUserForm />
        <Link
          className="paragraph-3-medium mt-3 text-center underline"
          href={"/signin"}
        >
          Sign In instead?
        </Link>
        <div className="paragraph-4-regular my-[22px] text-center">or</div>
        {providers && <LoginButton providers={providers} />}
      </div>
    </div>
  );
};

export default SignUp;
