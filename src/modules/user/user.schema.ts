import { Schema, model } from "mongoose";
import TUser, { TUserMethods } from "./user.interface";
import bycrpt from "bcrypt";
import env from "../../config/env";
import jwt from "jsonwebtoken";
const userSchema = new Schema<TUser, TUserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    books: {
      type: [Schema.Types.ObjectId],
      ref: "book",
    },
    reading: {
      type: [Schema.Types.ObjectId],
      ref: "book",
    },
    wishlist: {
      type: [Schema.Types.ObjectId],
      ref: "book",
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.static("passwordDecord", async function (basePassword) {
  if (!basePassword) {
    throw "Password required";
  } else {
    const data = await bycrpt.hash(basePassword, env.SOLT);
    return data;
  }
});
userSchema.static("getToken", async function (userId, expireIn) {
  if (!userId) return;
  const token = await jwt.sign({userId}, env.TOKEN, {
    expiresIn: expireIn,
  });
  return token;
});

const USER = model<TUser, TUserMethods>("user", userSchema);
export default USER;
