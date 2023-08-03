import mongoose, { ObjectId } from "mongoose";
import TBook, { TFilter } from "./book.interface";
import BOOK from "./book.schema";
import USER from "../user/user.schema";

export const getAllBooksDB = async (filter: TFilter) => {
  try {
    console.log(filter)
    let findDocument = [];
    let result;
    if (filter.genre && !(filter.genre === 'undefined')) {
      const regex = { $regex: new RegExp(`.*${filter?.genre}.*`, "i") };
      findDocument.push({ genre: regex });
    }
    if (filter.year && !(filter.year === "undefined")) {
      const regex = new RegExp(`^${filter.year}-`);
      findDocument.push({ publicationDate: regex });
    }
    
    if (filter?.search && !(filter.search === "undefined")) {
      result = await BOOK.aggregate([
        {
          $match: {
            $or: [
              { title: { $regex: new RegExp(`.*${filter?.search}.*`, "i") } },
              { author: { $regex: new RegExp(`.*${filter?.search}.*`, "i") } },
              { genre: { $regex: new RegExp(`.*${filter?.search}.*`, "i") } },
              {
                publicationDate: {
                  $regex: new RegExp(`.*${filter?.search}.*`, "i"),
                },
              },
            ],
          },
        },
      ]);
    } else if (findDocument.length > 0) {
      result = await BOOK.find({ $or: findDocument });
    } else {
      result = await BOOK.find();
    }
    return result;
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
export const deleteABookDB = async (userId: ObjectId, bookId: ObjectId) => {
  try {
    console.log({ _id: bookId, author: userId });
    const user = await BOOK.findOneAndDelete({
      _id: bookId,
      publisher: userId,
    });
    console.log(user);
    if (!user) {
      throw "book not found for delete";
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
