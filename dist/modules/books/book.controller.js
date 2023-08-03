"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removereading = exports.removewishlist = exports.addreading = exports.deleteABook = exports.addwishlist = exports.createABooks = exports.getAllBooksGenre = exports.getABook = exports.getReadInfo = exports.getAllBooks = void 0;
const book_service_1 = require("./book.service");
const book_schema_1 = __importDefault(require("./book.schema"));
const Types = require("mongoose").Types;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const genre = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.genre) || undefined;
        const year = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.year) || undefined;
        const search = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.search) || undefined;
        const filter = { genre, year, search };
        const result = yield (0, book_service_1.getAllBooksDB)(filter);
        res.json(result);
    }
    catch (error) {
        res.send(error);
    }
});
exports.getAllBooks = getAllBooks;
const getReadInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const id = (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d._id;
        const result = yield (0, book_service_1.getReadInfoDB)(id);
        res.json(result);
    }
    catch (error) {
        res.send(error);
    }
});
exports.getReadInfo = getReadInfo;
const getABook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, book_service_1.getABookDB)(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.send(error);
    }
});
exports.getABook = getABook;
const getAllBooksGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_schema_1.default.find().lean();
        console.log(result);
        const genre = yield Array.from(new Set(result.map((b) => b.genre)));
        res.json(genre);
    }
    catch (error) {
        res.send(error);
    }
});
exports.getAllBooksGenre = getAllBooksGenre;
const createABooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log({ body: req.body, user: req.user });
        const result = yield (0, book_service_1.createABooksDB)(Object.assign(Object.assign({}, req.body), { publisher: req.user._id }));
        res.json(result);
    }
    catch (error) {
        res.send(error);
    }
});
exports.createABooks = createABooks;
const addwishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e._id;
        if (!userId || !req.params.bookId) {
            throw new Error("user cridention or book cridention is missing");
        }
        const bookId = new Types.ObjectId(req.params.bookId);
        const result = yield (0, book_service_1.addwishlistDB)(userId, bookId);
        res.json(result);
    }
    catch (error) {
        res.send(error);
    }
});
exports.addwishlist = addwishlist;
const deleteABook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f._id;
        if (!userId || !req.params.id) {
            throw new Error("user cridention or book cridention is missing");
        }
        const bookId = new Types.ObjectId(req.params.id);
        const result = yield (0, book_service_1.deleteABookDB)(userId, bookId);
        res.json(result);
    }
    catch (error) {
        console.log("error", error);
        res.json(error);
    }
});
exports.deleteABook = deleteABook;
const addreading = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const userId = (_g = req.user) === null || _g === void 0 ? void 0 : _g._id;
        if (!userId || !req.params.bookId) {
            throw new Error("user cridention or book cridention is missing");
        }
        const bookId = new Types.ObjectId(req.params.bookId);
        const result = yield (0, book_service_1.addReadingDB)(userId, bookId);
        res.json(result);
    }
    catch (error) {
        res.send(error);
    }
});
exports.addreading = addreading;
const removewishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        const userId = (_h = req.user) === null || _h === void 0 ? void 0 : _h._id;
        if (!userId || !req.params.bookId) {
            throw new Error("user cridention or book cridention is missing");
        }
        const bookId = new Types.ObjectId(req.params.bookId);
        const result = yield (0, book_service_1.removewishlistDB)(userId, bookId);
        res.json(result);
    }
    catch (error) {
        res.send(error);
    }
});
exports.removewishlist = removewishlist;
const removereading = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    try {
        const userId = (_j = req.user) === null || _j === void 0 ? void 0 : _j._id;
        if (!userId || !req.params.bookId) {
            throw new Error("user cridention or book cridention is missing");
        }
        const bookId = new Types.ObjectId(req.params.bookId);
        const result = yield (0, book_service_1.removereadingDB)(userId, bookId);
        res.json(result);
    }
    catch (error) {
        res.send(error);
    }
});
exports.removereading = removereading;
