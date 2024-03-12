import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  value: string;
  label: string;
}

const TagSchema = new Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true },
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
