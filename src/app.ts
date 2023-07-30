import express, { Application } from "express";
import cors from "cors";
import userRoute from "./modules/user/user.route";
import bookRoute from "./modules/books/book.route";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/user", userRoute);
app.use("/book", bookRoute);

export default app;
