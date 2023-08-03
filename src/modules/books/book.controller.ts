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
  deleteABookDB,
} from "./book.service";
import { ObjectId } from "mongoose";
import { TFilter } from "./book.interface";
import BOOK from "./book.schema";
const Types = require("mongoose").Types;

export const getAllBooks: RequestHandler = async (req, res) => {
  try {
    const genre: string | undefined = (req.query?.genre as string) || undefined;
    const year: string | undefined = (req.query?.year as string) || undefined;
    const search: string | undefined =
      (req.query?.search as string) || undefined;

    const filter: TFilter = { genre, year, search }; 
    const result = await getAllBooksDB(filter);
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
export const getAllBooksGenre: RequestHandler = async (req, res) => {
  try {
    const result = await BOOK.find().lean()
    console.log(result);
    const genre = await Array.from(new Set(result.map((b) => b.genre)));
    res.json(genre);
  } catch (error) {
    res.send(error);
  }
};

export const createABooks: RequestHandler = async (req, res) => {
  try {
    console.log({ body: req.body, user: req.user });
    const result = await createABooksDB({
      ...req.body,
      publisher: req.user._id,
    });
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

export const deleteABook: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId || !req.params.id) {
      throw new Error("user cridention or book cridention is missing");
    }
    const bookId = new Types.ObjectId(req.params.id);
    const result = await deleteABookDB(userId, bookId);
    res.json(result);
  } catch (error) {
    console.log("error", error);
    res.json(error);
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
