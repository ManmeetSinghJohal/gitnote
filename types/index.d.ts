import { POST_TYPE } from "@/database/post.model";

export interface PostTags {
  value: string;
  label: string;
}

export interface CreateTypeNames {
  createType: POST_TYPE;
  textColor: string;
  name: string;
}