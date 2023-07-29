import { JwtPayload } from "jsonwebtoken";
import { Model, ObjectId } from "mongoose";

type TUser = {
  name: string;
  email: string;
  password: string;
  books: ObjectId[];
  wishlist?: ObjectId[];
  reading?: ObjectId[]; 
  token: string;
};

export interface TUserMethods extends Model<TUser> {
  passwordDecord(basePassword: string): string;
  passwordMatch(basePassword: string, ancodedPassword: string): boolean;
  getToken(userId: JwtPayload, expiresIn: string): string;
  matchToken(token: string): string;
}

export type TUserRegistration = {
  name: string;
  email: string;
  password: string;
};
export default TUser;
