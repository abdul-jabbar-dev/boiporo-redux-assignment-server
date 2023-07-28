import { RequestHandler } from "express";
import { getAllUserDB, registrationDB } from "./user.service";

export const registration: RequestHandler = async (req, res) => {
  try {
    const data = await registrationDB(req.body);
    res.cookie("A_Token", data.accessToken);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

export const getAllUser: RequestHandler = async (rq, res) => {
  try {
    const users = await getAllUserDB();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};
