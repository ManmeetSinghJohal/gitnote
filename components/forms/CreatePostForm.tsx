"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  createtype: z
    .string()
    .min(2, { message: "You must select a type." }),
  tags: z.string().min(2, { message: "Tags must be at least 2 characters." }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  learned: z
    .string()
    .min(2, { message: "Learned must be at least 2 characters." }),
  content: z
    .string()
    .min(2, { message: "Content must be at least 2 characters." }),
  resources: z
    .string()
    .min(2, { message: "Resources must be at least 2 characters." }),
});

const CreatePostForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      createtype: "",
      tags: "",
      description: "",
      learned: "",
      content: "",
      resources: "",
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control, // control props comes from useForm (optional: if you are using FormContext)
      name: "learned", // unique name for your Field Array
    }
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[30px]">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-3-medium">Title</FormLabel>
              <FormControl>
                <Input
                  className="paragraph-3-regular h-12 rounded border-none bg-black-700 pl-3"
                  placeholder="Enter the title of the post"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="createtype"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-3-medium">Create Type</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="paragraph-3-regular h-[48px] w-full border-none bg-black-700 text-xs text-muted-foreground">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="border-none bg-black-700">
                    <SelectItem value="component">
                      <div className="flex gap-[5px]">
                        <Image
                          src="/assets/icons/component.svg"
                          alt="Component"
                          width={12}
                          height={12}
                        />
                        <div className="text-purple-500">Component</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="knowledge">
                      <div className="flex gap-[5px]">
                        <Image
                          src="/assets/icons/knowledge.svg"
                          alt="knowledge"
                          width={12}
                          height={12}
                        />
                        <div className="text-green-500">Knowledge</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="workflow">
                      <div className="flex gap-[5px]">
                        <Image
                          src="/assets/icons/workflow.svg"
                          alt="workflow"
                          width={12}
                          height={12}
                        />
                        <div className="text-primary1-500">WorkFlow</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-3-medium">Tags</FormLabel>
              <FormControl>
                <Input
                  className="paragraph-3-regular h-12 rounded border-none bg-black-700 pl-3"
                  placeholder="Search tags"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-3-medium">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a short description"
                  className="paragraph-3-regular h-[100px] resize-none rounded border-none bg-black-700 text-xs"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="learned"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-3-medium">
                What you learned
              </FormLabel>
              <FormControl>
                <div className="relative flex h-[48px] w-full items-center gap-1 rounded bg-black-700 px-4">
                  <Image
                    src="/assets/icons/checkmark.svg"
                    alt="checkmark"
                    width={16}
                    height={16}
                  />
                  <Input
                    className="paragraph-3-regular h-12 border-none pl-3"
                    placeholder="Enter what you learned"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <input
            key={field.id} // important to include key with field's id
            {...form.register(`learned.${index}.lesson`)}
            className="text-black-900"
          />
        ))}

        <Button
          className="h-9 w-full rounded bg-black-600"
          type="button"
          onClick={() => append({ lesson: "hello" })}
        >
          <div className="flex gap-2">
            <Image
              src="/assets/icons/plusblue.svg"
              alt="plus"
              width={16}
              height={16}
            />
            <div className="paragraph-4-medium text-white-100">
              Add checkmark
            </div>
          </div>
        </Button>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-3-medium text-white-500">
                CONTENT
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    // editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue=""
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                  }}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resources"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="paragraph-3-medium mb-[30px] text-white-500">
                  RESOURCES & LINKS
                </div>
              </FormLabel>
              <div className="gap-2 space-y-2 lg:flex lg:space-y-0">
                <FormControl>
                  <div className="h-[48px] w-full rounded bg-black-700">
                    <Input
                      className="paragraph-3-regular h-12 border-none pl-3"
                      placeholder="Label"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormControl>
                  <div className="h-[48px] w-full rounded bg-black-700">
                    <Input
                      className="paragraph-3-regular h-12 border-none pl-3"
                      placeholder="Resource Link"
                      {...field}
                    />
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="h-9 w-full rounded bg-black-600">
          <div className="flex gap-2">
            <Image
              src="/assets/icons/plusblue.svg"
              alt="plus"
              width={16}
              height={16}
            />
            <div className="paragraph-4-medium text-white-100 ">
              New Resource
            </div>
          </div>
        </Button>

        <div className="pt-11">
          <Button
            className="paragraph-3-bold h-11 w-full rounded bg-primary1-500 text-black-900"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating Post..." : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;
