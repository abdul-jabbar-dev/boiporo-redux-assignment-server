import { RequestHandler } from "express";
import {
  createABooksDB,
  getAllBooksDB,
  getABookDB,
  addwishlistDB,
  removewishlistDB,
} from "./book.service";
const Types = require("mongoose").Types;

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
    const userId = req.user?._id;
    const bookId = new Types.ObjectId(req.params.bookId);
    if (!userId || !bookId) {
      throw new Error("user cridention or book cridention is missing");
    }

    const result = await addwishlistDB(userId, bookId);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};

export const removewishlist: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?._id;
    const bookId = new Types.ObjectId(req.params.bookId);
    if (!userId || !bookId) {
      throw new Error("user cridention or book cridention is missing");
    }

    const result = await removewishlistDB(userId, bookId);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};
