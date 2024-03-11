import { Schema, models, model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  createType: string;
  tags: Schema.Types.ObjectId[];
  description: string;
  learned: object[];
  content: string;
  resources: object[];
}

const PostSchema = new Schema({
  title: { type: String, required: true },
  createType: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  description: { type: String, required: true },
  learned: { type: Array, required: true },
  content: { type: String, required: true },
  resources: { type: Array, required: true },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
