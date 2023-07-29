import { RequestHandler } from "express";
import { getAllUserDB, registrationDB } from "./user.service";

export const registration: RequestHandler = async (req, res) => {
  try {
    const { refreshToken, ...other } = await registrationDB(req.body);

    res.cookie("R_Token", refreshToken,{httpOnly:true});
    res.send(other);
  } catch (error) {
    res.json(error);
  }
};

export const getAllUser: RequestHandler = async (req, res) => {
  try {
    console.log(req.user)
    const users = await getAllUserDB();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};
