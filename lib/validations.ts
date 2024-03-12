import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;


export const PostSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  createType: z.string(),
  tags: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  learned: z.array(
    z.object({
      lesson: z.string(),
    })
  ),
  content: z.string(),
  resources: z.array(
    z.object({
      label: z.string(),
      resource: z.string(),
    })
  ),
});