import TBook from "./book.interface";
import BOOK from "./book.schema";

export const getAllBooksDB = async () => {
  try {
    const data = await BOOK.find();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createABooksDB = async (data: TBook) => {
  try {
    const result = await BOOK.create(data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const createABookDB = () => {};
