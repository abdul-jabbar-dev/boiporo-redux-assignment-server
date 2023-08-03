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
exports.removereadingDB = exports.deleteABookDB = exports.removewishlistDB = exports.addReadingDB = exports.addwishlistDB = exports.createABooksDB = exports.getABookDB = exports.getReadInfoDB = exports.getAllBooksDB = void 0;
const book_schema_1 = __importDefault(require("./book.schema"));
const user_schema_1 = __importDefault(require("../user/user.schema"));
const getAllBooksDB = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(filter);
        let findDocument = [];
        let result;
        if (filter.genre && !(filter.genre === 'undefined')) {
            const regex = { $regex: new RegExp(`.*${filter === null || filter === void 0 ? void 0 : filter.genre}.*`, "i") };
            findDocument.push({ genre: regex });
        }
        if (filter.year && !(filter.year === "undefined")) {
            const regex = new RegExp(`^${filter.year}-`);
            findDocument.push({ publicationDate: regex });
        }
        if ((filter === null || filter === void 0 ? void 0 : filter.search) && !(filter.search === "undefined")) {
            result = yield book_schema_1.default.aggregate([
                {
                    $match: {
                        $or: [
                            { title: { $regex: new RegExp(`.*${filter === null || filter === void 0 ? void 0 : filter.search}.*`, "i") } },
                            { author: { $regex: new RegExp(`.*${filter === null || filter === void 0 ? void 0 : filter.search}.*`, "i") } },
                            { genre: { $regex: new RegExp(`.*${filter === null || filter === void 0 ? void 0 : filter.search}.*`, "i") } },
                            {
                                publicationDate: {
                                    $regex: new RegExp(`.*${filter === null || filter === void 0 ? void 0 : filter.search}.*`, "i"),
                                },
                            },
                        ],
                    },
                },
            ]);
        }
        else if (findDocument.length > 0) {
            result = yield book_schema_1.default.find({ $or: findDocument });
        }
        else {
            result = yield book_schema_1.default.find();
        }
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllBooksDB = getAllBooksDB;
const getReadInfoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_schema_1.default.findById(id).populate(["wishlist", "reading"]);
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getReadInfoDB = getReadInfoDB;
const getABookDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_schema_1.default.findById(id);
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getABookDB = getABookDB;
const createABooksDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_schema_1.default.create(data);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.createABooksDB = createABooksDB;
const addwishlistDB = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.default.findByIdAndUpdate(userId, {
            $addToSet: {
                wishlist: bookId,
            },
        }).lean();
        if (!user) {
            throw "user is invalid";
        }
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.addwishlistDB = addwishlistDB;
const addReadingDB = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.default.findByIdAndUpdate(userId, {
            $addToSet: {
                reading: bookId,
            },
        }).lean();
        if (!user) {
            throw "user is invalid";
        }
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.addReadingDB = addReadingDB;
const removewishlistDB = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.default.findByIdAndUpdate(userId, {
            $pull: { wishlist: bookId },
        }).lean();
        if (!user) {
            throw "user is invalid";
        }
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.removewishlistDB = removewishlistDB;
const deleteABookDB = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log({ _id: bookId, author: userId });
        const user = yield book_schema_1.default.findOneAndDelete({
            _id: bookId,
            publisher: userId,
        });
        console.log(user);
        if (!user) {
            throw "book not found for delete";
        }
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteABookDB = deleteABookDB;
const removereadingDB = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.default.findByIdAndUpdate(userId, {
            $pull: { reading: bookId },
        }).lean();
        if (!user) {
            throw "user is invalid";
        }
        console.log(user);
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.removereadingDB = removereadingDB;
