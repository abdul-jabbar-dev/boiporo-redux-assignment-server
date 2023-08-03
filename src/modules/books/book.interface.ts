import { ObjectId } from "mongoose";

type TBook = {
  title: string;
  author: string;
  genre: string;
  publisher?: ObjectId;
  publicationDate: string;
  reviews: string;
  imageURL: string;
};

export type TFilter = {
  genre?: string;
  year?: string;
  search?: string;
};

export default TBook;
