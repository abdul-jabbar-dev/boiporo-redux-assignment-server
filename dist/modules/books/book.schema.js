"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: mongoose_1.Schema.ObjectId,
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
}, { timestamps: true });
const BOOK = (0, mongoose_1.model)("book", bookSchema);
exports.default = BOOK;
