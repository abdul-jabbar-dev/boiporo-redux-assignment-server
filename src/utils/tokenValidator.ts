import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config/env";
import USER from "../modules/user/user.schema";
import { ObjectId } from "mongoose";
const tokenValidator = async (token: string) => {
  try {
    const userI: any = jwt.verify(token, env.TOKEN);

    if (userI && userI.userId) {
      const user = await USER.findById(userI.userId).lean();
      if (!user) {
        throw "Token invalid";
      } else {
        return user;
      }
    } else {
      throw "Token invalid";
    }
  } catch (error) {
    throw error;
  }
};
export default tokenValidator;
