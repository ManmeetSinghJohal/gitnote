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
    <div className="space-y-4">
      {Object.values(providers)
        .filter((provider) => provider.id !== "credentials") // Exclude the "credentials" provider
        .map((provider) => (
          <div key={provider.name}>
            <Button
              className="w-full rounded bg-black-700"
              onClick={() => {
                try {
                  signIn(provider.id);
                } catch (error) {
                  console.log("Error signing in with provider", provider.id);
                }
              }}
            >
              <div className="paragraph-3-medium">Continue with {provider.name}</div>
            </Button>
          </div>
        ))}
    </div>
  );
};

export default LoginButton;
