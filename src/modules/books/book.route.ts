import { Router } from "express";
import { createABooks, getAllBooks } from "./book.controller";

const bookRoute = Router();
bookRoute.get("/", getAllBooks);
bookRoute.post("/", createABooks);
export default bookRoute;
