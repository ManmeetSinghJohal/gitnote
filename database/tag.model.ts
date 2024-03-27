import { Model, Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  value: string;
  label: string;
  ownerId: Schema.Types.ObjectId;
}

const TagSchema = new Schema<ITag>({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Tag = (models.Tag as Model<ITag>) || model<ITag>("Tag", TagSchema);

export default Tag;
