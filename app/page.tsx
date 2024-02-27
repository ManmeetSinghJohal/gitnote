import React from "react";

import LoginButton from "@/components/auth/LoginButton";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex justify-center p-10">
      <div className="flex w-96 flex-col gap-2">
        <h1>Login</h1>
        <LoginForm />
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
