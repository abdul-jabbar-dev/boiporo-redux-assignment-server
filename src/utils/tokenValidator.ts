import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config/env";
import USER from "../modules/user/user.schema";
const tokenValidator = async (token: string) => {
  try {
    const tokenValid = jwt.verify(token, env.TOKEN);
    if ((tokenValid as JwtPayload).userId) {
      const user = await USER.findById(
        (tokenValid as JwtPayload).userId
      ).lean();
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
