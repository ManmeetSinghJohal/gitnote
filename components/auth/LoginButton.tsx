"use client";

import { signIn } from "next-auth/react";
import React from "react";

import { Button } from "../ui/button";

type Provider = {
  id: string;
  name: string;
};

type LoginButtonProps = {
  providers: Record<string, Provider>;
};

const LoginButton: React.FC<LoginButtonProps> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </>
  );
};

export default LoginButton;
