import { Router } from "express";
import { createABooks, getABook, getAllBooks } from "./book.controller";

const bookRoute = Router();
bookRoute.get("/", getAllBooks);
bookRoute.get("/:id", getABook);
bookRoute.post("/", createABooks);
export default bookRoute;
