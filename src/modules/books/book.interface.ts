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
export default TBook;
