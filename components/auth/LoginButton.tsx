"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "../ui/button";

const LoginButton = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/api/auth/signin");
  };
  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={onClick}
      className="cursor-pointer"
    >
      Sign in
    </Button>
  );
};

export default LoginButton;
