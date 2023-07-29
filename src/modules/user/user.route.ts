import { Router } from "express";
import { getAllUser, loginUser, registration } from "./user.controller";
import authValidate from "../../middlewares/authValidate";

const userRoute = Router();
userRoute.get("/", authValidate(), getAllUser);
userRoute.post("/login", loginUser);
userRoute.post("/registration", registration);

export default userRoute;
