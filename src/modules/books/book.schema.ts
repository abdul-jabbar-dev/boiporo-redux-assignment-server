import { Schema, model } from "mongoose";
import TBook from "./book.interface";

const bookSchema = new Schema<TBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: Schema.ObjectId,
      ref: "user",
    },
    genre: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    reviews: String,
  },
  { timestamps: true }
);
const BOOK = model("book", bookSchema);
export default BOOK;
