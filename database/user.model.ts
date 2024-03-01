import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: false },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHashed: { type: String },
  },
  {
    timestamps: true,
  }
);


const User = models.User || model("User", UserSchema);

console.log("User", User);
export default User;
