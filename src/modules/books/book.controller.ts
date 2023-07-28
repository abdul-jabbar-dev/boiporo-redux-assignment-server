import { RequestHandler } from "express"; 
import { createABooksDB, getAllBooksDB, getABookDB } from "./book.service";

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
