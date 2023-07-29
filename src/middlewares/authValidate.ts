import { RequestHandler } from "express";
import tokenValidator from "../utils/tokenValidator";

const authValidate = (): RequestHandler => async (req, res, next) => {
  try {
    const jwtTokenString = req.headers.authorization;
    if (jwtTokenString) {
      const Token = jwtTokenString.split(" ")[1];
      const user = await tokenValidator(Token);
      req.user = user;
      next();
    } else throw "token requried";
  } catch (error) {
    res.send("Token requried");
  }
};
export default authValidate;
