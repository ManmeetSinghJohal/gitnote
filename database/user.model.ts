import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password?: string;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
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

console.log("models", models);

const User = models.User || model("User", UserSchema);

export default User;
