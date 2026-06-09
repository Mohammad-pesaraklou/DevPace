import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, uniqe: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const UserModel = mongoose.models.User || model("User", UserSchema);

export default UserModel;
