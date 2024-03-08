import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  value: string;
  label: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const TagSchema = new Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now },
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
