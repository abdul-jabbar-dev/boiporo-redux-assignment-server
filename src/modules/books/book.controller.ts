import { RequestHandler } from "express";
import { createABooksDB, getAllBooksDB, getABookDB, addwishlistDB } from "./book.service";

export const getAllBooks: RequestHandler = async (req, res) => {
  try {
    const result = await getAllBooksDB();
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};
export const getABook: RequestHandler = async (req, res) => {
  try {
    const result = await getABookDB(req.params.id);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};

export const createABooks: RequestHandler = async (req, res) => {
  try {
    const result = await createABooksDB(req.body);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};

export const addwishlist: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?._id
    const bookId = req.params.bookId;
    const result = await addwishlistDB(userId,bookId);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};
