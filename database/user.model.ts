import { Model, Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, unique: false },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = (models.User as Model<IUser>) || model<IUser>("User", UserSchema);

console.log("User", User);
export default User;
