import mongoose, { ObjectId } from "mongoose";
import TBook from "./book.interface";
import BOOK from "./book.schema";
import USER from "../user/user.schema";

export const getAllBooksDB = async () => {
  try {
    const data = await BOOK.find();
    return data;
  } catch (error) {
    throw error;
  }
};
export const getReadInfoDB = async (id: ObjectId) => {
  try {
    const data = await USER.findById(id).populate(["wishlist", "reading"]);
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

export const addwishlistDB = async (userId: ObjectId, bookId: ObjectId) => {
  try {
    const user = await USER.findByIdAndUpdate(userId, {
      $addToSet: {
        wishlist: bookId,
      },
    }).lean();

    if (!user) {
      throw "user is invalid";
    }

    return user;
  } catch (error) {
    throw error;
  }
};
export const addReadingDB = async (userId: ObjectId, bookId: ObjectId) => {
  try {
    const user = await USER.findByIdAndUpdate(userId, {
      $addToSet: {
        reading: bookId,
      },
    }).lean();
    if (!user) {
      throw "user is invalid";
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const removewishlistDB = async (userId: ObjectId, bookId: ObjectId) => {
  try {
    const user = await USER.findByIdAndUpdate(userId, {
      $pull: { wishlist: bookId },
    }).lean();
    if (!user) {
      throw "user is invalid";
    }

    return user;
  } catch (error) {
    throw error;
  }
};
export const removereadingDB = async (userId: ObjectId, bookId: ObjectId) => {
  try {
    const user = await USER.findByIdAndUpdate(userId, {
      $pull: { reading: bookId },
    }).lean();
    if (!user) {
      throw "user is invalid";
    }
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};
