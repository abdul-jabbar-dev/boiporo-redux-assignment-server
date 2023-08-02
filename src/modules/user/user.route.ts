import { Router } from "express";
import {
  getAllUser,
  loginUser,
  logoutUser,
  registration,
} from "./user.controller";
import authValidate from "../../middlewares/authValidate";

const userRoute = Router();
userRoute.get("/", authValidate(), async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.send(error);
  }
});
userRoute.patch("/logout", authValidate(), logoutUser);
userRoute.post("/login", loginUser);
userRoute.post("/registration", registration);

export default userRoute;
