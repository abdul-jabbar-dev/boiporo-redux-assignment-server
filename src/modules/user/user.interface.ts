import { Model, ObjectId } from "mongoose";

type TUser = {
  name: string;
  email: string;
  password: string;
  books: ObjectId[];
  wishlist?: ObjectId[];
  reading?: ObjectId[];
  refreshToken: string;
  accessToken: string;
};

export interface TUserMethods extends Model<TUser> {
  passwordDecord(basePassword: string): string;
  getToken(userId: string, expiresIn: string): string; 
  matchToken(token: string): string;
}

export type TUserRegistration = {
  name: string;
  email: string;
  password: string;
};
export default TUser;
