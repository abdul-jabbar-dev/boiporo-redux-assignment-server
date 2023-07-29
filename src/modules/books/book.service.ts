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

export const getABookDB = async (id: string) => {
  try {
    const data = await BOOK.findById(id);
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

export const addwishlistDB = async (userId: string, bookId: string) => {
  try {
    console.log({ userId, bookId });
  } catch (error) {
    throw error;
  }
};

export const createABookDB = () => {};
