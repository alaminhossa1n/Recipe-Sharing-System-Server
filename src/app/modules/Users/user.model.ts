import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photoURL: { type: String},
    coin: { type: Number, default:50},
    password: { type: String},
  },
  {
    timestamps: true,
  }
);

const UserModel = model<TUser>("Users", userSchema);

export default UserModel;
