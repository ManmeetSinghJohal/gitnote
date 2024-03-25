import {Model,  Schema, models, model, Document } from "mongoose";
import {ITag} from './tag.model';

export interface IPost extends Document {
  title: string;
  createType: string;
  tags: Schema.Types.ObjectId[];
  description: string;
  checkList: object[];
  code: string;
  content: string;
  resources: object[];
  ownerId: Schema.Types.ObjectId;
  createdAt: Date;
}

export interface ICheckListItem {
  step_lesson: string;
}

const CheckListItem = new Schema<ICheckListItem>({
  step_lesson: {type: String, required: true}
});

export interface IResource {
  label: string;
  resource: string;
}

const ResourceItem = new Schema<IResource>({
  label: {type: String, required: true},
  resource: {type: String, required: true}
});

export type IPostWithTags = Omit<IPost, "tags"> & {
  tags: ITag[]
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  createType: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  description: { type: String, required: true },
  checkList: [{ type: CheckListItem, required: true }],
  code: { type: String, required: false },
  content: { type: String, required: true },
  resources: [{ type: ResourceItem, required: true }],
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: new Date(), required: true },
});

const Post = (models.Post as Model<IPost> ) || model<IPost>("Post", PostSchema);

export default Post;
