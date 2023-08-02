import { RequestHandler } from "express";
import {
  createABooksDB,
  getAllBooksDB,
  getABookDB,
  addwishlistDB,
  removewishlistDB,
  addReadingDB,
  getReadInfoDB,
  removereadingDB,
} from "./book.service";
import { ObjectId } from "mongoose";
const Types = require("mongoose").Types;

export const getAllBooks: RequestHandler = async (req, res) => {
  try {
    const result = await getAllBooksDB();
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};
export const getReadInfo: RequestHandler = async (req, res) => {
  try {
    const id: ObjectId = req?.user?._id;
    const result = await getReadInfoDB(id);
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
    if (!userId || !req.params.bookId) {
      throw new Error("user cridention or book cridention is missing");
    }
    const bookId = new Types.ObjectId(req.params.bookId);

    const result = await addwishlistDB(userId, bookId);

    res.json(result);
  } catch (error) {
    res.send(error);
  }
};

export const addreading: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId || !req.params.bookId) {
      throw new Error("user cridention or book cridention is missing");
    }
    const bookId = new Types.ObjectId(req.params.bookId);

    const result = await addReadingDB(userId, bookId);

    res.json(result);
  } catch (error) {
    res.send(error);
  }
};

export const removewishlist: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId || !req.params.bookId) {
      throw new Error("user cridention or book cridention is missing");
    }
    const bookId = new Types.ObjectId(req.params.bookId);

    const result = await removewishlistDB(userId, bookId);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};
export const removereading: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId || !req.params.bookId) {
      throw new Error("user cridention or book cridention is missing");
    }
    const bookId = new Types.ObjectId(req.params.bookId);

    const result = await removereadingDB(userId, bookId);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};
