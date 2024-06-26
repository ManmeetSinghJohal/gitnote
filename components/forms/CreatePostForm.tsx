"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Editor as TinyMCEEditor } from "tinymce";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createTypeNames } from "@/constants";
import { IPostWithTagsAndResources } from "@/database/post.model";
import { ITag } from "@/database/tag.model";
import { createPost, updatePost } from "@/lib/actions/post.action";
import { PostSchema } from "@/lib/validations";

import { CreateTypeBadge } from "../ui/createTypeBadge";

const CreatePostForm = ({
  postTags,
  post,
}: {
  postTags: ITag[];
  post?: IPostWithTagsAndResources;
}) => {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const router = useRouter();
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const selectedPost = post;
  const checkListObject = post?.checkList.map((stepLesson) => ({
    step_lesson: stepLesson,
  }));

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: selectedPost?.title || "",
      createType: selectedPost?.createType || "",
      description: selectedPost?.description || "",
      checkList: checkListObject || [{ step_lesson: "" }],
      code: selectedPost?.code || "",
      content: selectedPost?.content || "",
      resources: selectedPost?.resources || [{ label: "", resource: "" }],
      tags: selectedPost?.tags || [],
    },
  });

  const {
    fields: checkListFields,
    append: checkListAppend,
    remove: checkListRemove,
  } = useFieldArray({
    control: form.control,
    name: "checkList",
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

  const isCreateType = form.watch("createType");
  const previewCode = form.watch("code");

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      setIsPopOverOpen(false);

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            message: "Tag cannot be longer than 15 characters.",
          });
        }

        const verifyOrCreateBadge = !tagsFields.some(
          (tagField) => tagField.value === tagValue
        );

        if (verifyOrCreateBadge) {
          tagsAppend({
            label: tagValue.toLowerCase(),
            value: tagValue.toLowerCase(),
          });
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  async function onSubmit(values: z.infer<typeof PostSchema>) {
    try {
      if (selectedPost) {
        await updatePost(post._id, values);
        router.push("/details/" + post._id);
      } else {
        const newPost = await createPost({
          ...values,
        });
        router.push("/details/" + newPost._id);
      }
    } catch (error) {
      console.log("error", error);
    }
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
          name="createType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-3-medium">Create Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="paragraph-3-regular h-[48px] w-full border-none bg-black-700 text-xs text-muted-foreground">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="border-none bg-black-700">
                    {createTypeNames.map((badge) => (
                      <SelectItem
                        value={badge.createType}
                        key={badge.createType}
                      >
                        <CreateTypeBadge
                          key={badge.createType}
                          variant={badge.createType}
                          className="space-x-[5px]"
                        />
                      </SelectItem>
                    ))}
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
              <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
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
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />
                    <CommandEmpty>No tag found.</CommandEmpty>
                    <CommandGroup>
                      {postTags.map((tag) => (
                        <CommandItem
                          value={tag.label}
                          key={tag._id}
                          onSelect={() => {
                            setIsPopOverOpen(false);
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
                  className="paragraph-3-regular h-[100px] resize-none rounded border-none bg-black-700 py-[14px] text-xs"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isCreateType !== "component" && (
          <div>
            <div className="paragraph-3-medium">
              {isCreateType === "knowledge"
                ? "What you learned"
                : "Steps to follow"}
            </div>
            {checkListFields.map((field, index) => (
              <FormField
                control={form.control}
                name={`checkList.${index}.step_lesson`}
                key={field.id}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative my-2 flex h-[48px] w-full items-center gap-1 rounded bg-black-700 px-4">
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
                          onClick={() => checkListRemove(index)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              className="mt-[6px] h-9 w-full rounded bg-black-600"
              type="button"
              onClick={() => checkListAppend({ step_lesson: "" })}
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
          </div>
        )}

        {isCreateType === "component" && (
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="bg-black-800">
              <TabsTrigger value="code">
                <div className="flex gap-2">
                  <Image
                    src="/assets/icons/codeArrows.svg"
                    alt="plus"
                    width={16}
                    height={16}
                  />
                  <div className="paragraph-3-medium">Code</div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="preview">
                <div className="flex gap-2">
                  <Image
                    src="/assets/icons/eye.png"
                    alt="plus"
                    width={16}
                    height={16}
                  />
                  <div className="paragraph-3-medium">Preview</div>
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="paragraph-3-regular h-[200px] rounded border-none bg-black-700 pl-3"
                        placeholder="Enter your code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="preview">
              <pre>
                <code>{previewCode}</code>
              </pre>
            </TabsContent>
          </Tabs>
        )}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3 pt-[30px]">
              <FormLabel className="paragraph-3-medium text-white-500">
                CONTENT
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={field.onChange}
                  initialValue={post?.content}
                  init={{
                    height: 216,
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
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist | warningButton | errorButton | informationButton | link image media | removeformat | fullscreen",
                    content_style:
                      "body { font-family:Inter; font-size:16px; background-color:#1D2032;}",
                    skin: "oxide-dark",
                    content_css: "dark",
                    setup: (editor) => {
                      const toWarningHtml = function () {
                        return `&#8203;<div class="warning-box" style="background-color: #20201E; border: 1px solid #FFC700; border-radius: 6px; margin: 20px 0; padding: 14px; color: #FFFFFF;">Add warning here....</div>&#8203;`;
                      };

                      const toErrorHtml = function () {
                        return `&#8203;<div class="error-box" style="background-color: rgba(255, 76, 63, 0.15); border: 1px solid #FF4C3F; border-radius: 6px; margin: 20px 0; padding: 14px; color: #FFFFFF;">Add error here....</div>&#8203;`;
                      };

                      const toInformationHtml = function () {
                        return `&#8203;<div class="information-box" style="background-color: rgb(66,187,255, 0.1); border: 1px solid #42BBFF; border-radius: 6px; margin: 20px 0; padding: 14px; color: #FFFFFF;">Add information here....</div>&#8203;`;
                      };

                      editor.ui.registry.addButton("warningButton", {
                        text: "Warning",
                        tooltip: "Warning Label",
                        onAction: function (_) {
                          editor.insertContent(toWarningHtml());
                        },
                      });
                      editor.ui.registry.addButton("errorButton", {
                        text: "Error",
                        tooltip: "Error Label",
                        onAction: function (_) {
                          editor.insertContent(toErrorHtml());
                        },
                      });
                      editor.ui.registry.addButton("informationButton", {
                        text: "Information",
                        tooltip: "Information Label",
                        onAction: function (_) {
                          editor.insertContent(toInformationHtml());
                        },
                      });
                    },
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="paragraph-3-medium mb-[30px] pt-[30px] text-white-500">
          RESOURCES & LINKS
        </div>
        {resourcesFields.map((field, index) => (
          <div key={field.id}>
            <div className="gap-2 space-y-2 lg:flex lg:space-y-0">
              <div className="grow">
                <FormField
                  control={form.control}
                  name={`resources.${index}.label`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex h-[48px] w-full items-center gap-1 rounded bg-black-700 px-4">
                          <Input
                            className="paragraph-3-regular h-12 border-none"
                            placeholder="Label"
                            {...field}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grow">
                <FormField
                  control={form.control}
                  name={`resources.${index}.resource`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex h-[48px] w-full items-center gap-1 rounded bg-black-700 px-4">
                          <Input
                            className="paragraph-3-regular h-12 border-none"
                            placeholder="Resource Link"
                            {...field}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              className="mt-[14px] h-9 w-full rounded bg-black-600"
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
          </div>
        ))}

        <div className="pt-11">
          <Button
            className="paragraph-3-bold h-11 w-full rounded bg-primary1-500 text-black-900"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {selectedPost
              ? form.formState.isSubmitting
                ? "Updating Post..."
                : "Update Post"
              : form.formState.isSubmitting
                ? "Creating Post..."
                : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;
