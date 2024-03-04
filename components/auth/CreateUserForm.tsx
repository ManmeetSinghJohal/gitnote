"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

const CreateUserForm = () => {
  const [error, setError] = useState("");
  
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const resUserExists = await fetch("/api/userexists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User with this email already exists.");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        console.log("User created successfully");
        router.push("/signin");
      } else {
        console.log("Error creating user");
      }
    } catch (error) {
      console.log("Error connecting to database", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-3-medium">Full Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Full Name"
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

export default CreateUserForm;
