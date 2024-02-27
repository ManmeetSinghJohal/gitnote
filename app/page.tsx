import React from "react";

import LoginButton from "@/components/auth/LoginButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  return (
    <div className="flex justify-center p-10">
      <div className="flex w-96 flex-col gap-2">
        <Label htmlFor="email">Full Name</Label>
        <Input type="name" id="name" placeholder="Enter your full name"/>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Enter your email address" />
        <Label htmlFor="email">Password</Label>
        <Input type="password" id="password" placeholder="Enter your password" />
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
