import { RequestHandler } from "express";
import tokenValidator from "../utils/tokenValidator";

const authValidate = (): RequestHandler => async (req, res, next) => {
  try {
    const jwtTokenString = req.cookies;
    if (jwtTokenString.token) {
      const user = await tokenValidator(jwtTokenString.token);
      req.user = user;
      next();
    } else throw "token requried";
  } catch (error) {
    res.send("Token requried");
  }
};
export default authValidate;
