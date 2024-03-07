"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import React, { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { postTags } from "@/constants/index";
import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  createtype: z.string(),
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
  content: z
    .string()
    .min(2, { message: "Content must be at least 2 characters." }),
  resources: z.array(
    z.object({
      label: z.string(),
      resource: z.string(),
    })
  ),
});

const CreatePostForm = () => {
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      createtype: "",
      description: "",
      learned: [{ lesson: "" }],
      content: "",
      resources: [{ label: "", resource: "" }],
      tags: [],
    },
  });

  const {
    fields: learnedFields,
    append: learnedAppend,
    remove: learnedRemove,
  } = useFieldArray({
    control: form.control,
    name: "learned",
  });

  const {
    fields: resourcesFields,
    append: resourcesAppend,
    remove: resourcesRemove,
  } = useFieldArray({
    control: form.control,
    name: "resources",
  });

  const {
    fields: tagsFields,
    append: tagsAppend,
    remove: tagsRemove,
  } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
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
            <FormItem className="flex flex-col">
              <FormLabel className="paragraph-3-medium">Tags</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <div
                      className=" h-12 rounded border-none bg-black-700 pl-3"
                      {...field}
                    >
                      <div className="mr-3 flex h-full items-center justify-between">
                        <div className="paragraph-3-regular text-xs text-muted-foreground">
                          Search tags
                        </div>
                        {/* {field.value
                          ? postTags.find((tag) => tag.value === field.value)
                              ?.label
                          : "Select tag"} */}
                        <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                      </div>
                    </div>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] p-0">
                  <Command className="bg-black-900">
                    <CommandInput
                      placeholder="Search tags..."
                      className="h-9 text-white-100"
                    />
                    <CommandEmpty>No tag found.</CommandEmpty>
                    <CommandGroup className="">
                      {postTags.map((tag) => (
                        <CommandItem
                          value={tag.label}
                          key={tag.value}
                          onSelect={() => {
                            const shouldAppendTag = !tagsFields.some(
                              (tagField) => tagField.value === tag.value
                            );
                            if (shouldAppendTag) {
                              tagsAppend({
                                label: tag.label,
                                value: tag.value,
                              });
                            }
                          }}
                        >
                          {tag.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              tag.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {tagsFields.length > 0 && (
          <div className="flex flex-wrap items-center justify-start gap-4">
            {tagsFields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-2 rounded-sm bg-black-700 px-4 py-2 text-white-300"
              >
                <div className="paragraph-3-medium">{field.label}</div>
                <Image
                  src="/assets/icons/close.svg"
                  alt="close"
                  width={9}
                  height={9}
                  onClick={() => tagsRemove(index)}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}

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

        <div className="paragraph-3-medium">What you learned</div>
        {learnedFields.map((field, index) => (
          <FormField
            control={form.control}
            name={`learned.${index}.lesson`}
            key={field.id}
            render={({ field }) => (
              <FormItem>
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
                    <Image
                      src="/assets/icons/close.svg"
                      alt="close"
                      width={9}
                      height={9}
                      onClick={() => learnedRemove(index)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          className="h-9 w-full rounded bg-black-600"
          type="button"
          onClick={() => learnedAppend({ lesson: "" })}
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
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => console.log(content)}
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
                    skin: "oxide-dark",
                    content_css: "dark",
                  }}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="paragraph-3-medium mb-[30px] text-white-500">
          RESOURCES & LINKS
        </div>
        {resourcesFields.map((field, index) => (
          <>
            <FormField
              control={form.control}
              name={`resources.${index}.label`}
              key={field.id + "label"}
              render={({ field }) => (
                <FormItem>
                  <div className="gap-2 space-y-2 lg:flex lg:space-y-0">
                    <FormControl>
                      <div className="relative flex h-[48px] w-full items-center gap-1 rounded bg-black-700 px-4">
                        <Input
                          className="paragraph-3-regular h-12 border-none pl-3"
                          placeholder="Label"
                          {...field}
                          // value={field.value.label}
                        />
                        <Image
                          src="/assets/icons/close.svg"
                          alt="close"
                          width={9}
                          height={9}
                          onClick={() => resourcesRemove(index)}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`resources.${index}.resource`}
              key={field.id + "resource"}
              render={({ field }) => (
                <FormItem>
                  <div className="gap-2 space-y-2 lg:flex lg:space-y-0">
                    <FormControl>
                      <div className="relative flex h-[48px] w-full items-center gap-1 rounded bg-black-700 px-4">
                        <Input
                          className="paragraph-3-regular h-12 border-none pl-3"
                          placeholder="Resource Link"
                          {...field}
                          // value={field.value.resource}
                        />
                        <Image
                          src="/assets/icons/close.svg"
                          alt="close"
                          width={9}
                          height={9}
                          onClick={() => resourcesRemove(index)}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ))}

        <Button
          className="h-9 w-full rounded bg-black-600"
          type="button"
          onClick={() => resourcesAppend({ label: "", resource: "" })}
        >
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
