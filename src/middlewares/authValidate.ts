import { RequestHandler } from "express";
import tokenValidator from "../utils/tokenValidator";
const authValidate = (): RequestHandler => async (req, res, next) => {
  try {
    const jwtTokenString = req.headers;
    if (jwtTokenString.token as string) {
      const user = await tokenValidator(jwtTokenString?.token as string);
 
      req.user = user;

      next();
    } else throw "token requried";
  } catch (error) {
    res.send("Token requried");
  }
};
export default authValidate;
