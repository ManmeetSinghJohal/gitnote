"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

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
import { TSignUpSchema, signUpSchema } from "@/lib/types";

const CreateUserForm = () => {
  const router = useRouter();

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: TSignUpSchema) {
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
        form.setError("root", {
          message: "User with this email already exists.",
        });
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
      form.setError("root", {
        message: "Something went wrong. Please try again later.",
      });
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-3-medium">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
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
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
      {form.formState.errors.root && (
        <p className="text-red-500">{form.formState.errors.root.message}</p>
      )}
    </>
  );
};

export default CreateUserForm;
