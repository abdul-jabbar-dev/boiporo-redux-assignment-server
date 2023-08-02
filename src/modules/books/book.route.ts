import { Router } from "express";
import {
  createABooks,
  getABook,
  getAllBooks,
  addwishlist,
  removewishlist,
  addreading,
  getReadInfo,
  removereading,
} from "./book.controller";
import authValidate from "../../middlewares/authValidate";

const bookRoute = Router();
bookRoute.get("/", getAllBooks);
bookRoute.post("/", createABooks);
bookRoute.get("/bookinfo", authValidate(), getReadInfo);
bookRoute.get("/:id", getABook);

bookRoute.patch("/reading/:bookId", authValidate(), addreading);
bookRoute.delete("/reading/:bookId", authValidate(), removereading);
bookRoute.patch("/wishlist/:bookId", authValidate(), addwishlist);
bookRoute.delete("/wishlist/:bookId", authValidate(), removewishlist);
export default bookRoute;
