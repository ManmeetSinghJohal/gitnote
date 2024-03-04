"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

const LoginForm = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("error");
    if (search === "OAuthAccountNotLinked") {
      setError(
        "The email address is already linked to an account. Please log in with that account."
      );
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[22px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-3-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="paragraph-3-regular rounded border-none bg-black-700 pl-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-3-medium">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="paragraph-3-regular rounded border-none bg-black-700 pl-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="paragraph-3-bold w-full rounded bg-primary1-500 text-black-900"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form>
      {error && <p>{error}</p>}
    </>
  );
};

export default LoginForm;
