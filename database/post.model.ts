import { Schema, models, model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  createType: string;
  tags: Schema.Types.ObjectId[];
  description: string;
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

const PostSchema = new Schema({
  title: { type: String, required: true },
  createType: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  description: { type: String, required: true },
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
