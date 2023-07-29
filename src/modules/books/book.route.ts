import { Router } from "express";
import {
  createABooks,
  getABook,
  getAllBooks,
  addwishlist,
} from "./book.controller";

const bookRoute = Router();
bookRoute.get("/", getAllBooks);
bookRoute.get("/:id", getABook);
bookRoute.post("/", createABooks);

bookRoute.post("/add_wishlist/:bookId", addwishlist);
export default bookRoute;
