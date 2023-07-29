import { RequestHandler } from "express";
import { getAllUserDB, loginUserDB, registrationDB } from "./user.service";

export const registration: RequestHandler = async (req, res) => {
  try {
    const { token, ...other } = await registrationDB(req.body);

    res.cookie("token", token, { httpOnly: true });
    res.send(other);
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
      res.cookie("token", result.token, { httpOnly: true });
      res.send({
        ...result.toObject(),
        token: undefined,
        password: undefined,
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
