import { Router } from "express";
import {
  createABooks,
  getABook,
  getAllBooks,
  addwishlist,
  removewishlist,
} from "./book.controller";
import authValidate from "../../middlewares/authValidate";

const bookRoute = Router();
bookRoute.get("/", getAllBooks);
bookRoute.get("/:id", getABook);
bookRoute.post("/", createABooks);

bookRoute.patch("/wishlist/:bookId", authValidate(), addwishlist);
bookRoute.delete("/wishlist/:bookId", authValidate(), removewishlist);
export default bookRoute;
