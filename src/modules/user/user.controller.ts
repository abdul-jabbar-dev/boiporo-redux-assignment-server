import { RequestHandler } from "express";
import {
  getAllUserDB,
  loginUserDB,
  logoutUserDB,
  registrationDB,
} from "./user.service";

export const registration: RequestHandler = async (req, res) => {
  try {
    const result = await registrationDB(req.body);

    res.send(result);
  } catch (error) {
    res.json(error);
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    if (!req.body.password || !req.body.email) {
      res.send("email or password is missing");
    } else {
      const { password, email } = req.body;
      const result = await loginUserDB({ email, password });
      res.send({
        ...result.toObject(),
        password: undefined,
      });
    }
  } catch (error) {
    res.send(error);
  }
};
export const logoutUser: RequestHandler = async (req, res) => {
  try {
    if (!req.user.email) {
      res.send("email or password is missing");
    } else {
      const { email } = req.user;
      const result = await logoutUserDB({ email });
      res.send({
        email:result.email,
        status: "login successfully",
      });
    }
  } catch (error) {
    res.send(error);
  }
};

export const getAllUser: RequestHandler = async (req, res) => {
  try {
    console.log(req.user);
    const users = await getAllUserDB();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};
