import { Router } from "express";
import { getAllUser, registration } from "./user.controller";
import authValidate from "../../middlewares/authValidate";

const userRoute = Router();
userRoute.get("/", authValidate(), getAllUser);
userRoute.post("/", registration);

/*  
    * in registration
    just create a user object and make password decord using session 
   ! upnext: 
    1, jwt
    2, token
    3, store token

 */
export default userRoute;
