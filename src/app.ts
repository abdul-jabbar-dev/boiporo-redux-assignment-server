import express, { Application } from "express";
import cors from "cors";
import userRoute from "./modules/user/user.route";
import bookRoute from "./modules/books/book.route";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/book", bookRoute);

export default app;
