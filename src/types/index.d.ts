import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { FlattenMaps } from "mongoose";
declare global {
  namespace Express {
    interface Request {
      user: FlattenMaps<TUser> & {
        _id: Types.ObjectId;
      }|null
    }
  }
}
