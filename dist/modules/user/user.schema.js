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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = __importDefault(require("../../config/env"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    books: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "book",
    },
    reading: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "book",
    },
    wishlist: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "book",
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
}, { timestamps: true });
userSchema.static("passwordDecord", function (basePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!basePassword) {
            throw "Password required";
        }
        else {
            const data = yield bcrypt_1.default.hash(basePassword, env_1.default.SOLT);
            return data;
        }
    });
});
userSchema.static("passwordMatch", function (basePassword, ancodedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!basePassword) {
            throw "Password required";
        }
        else {
            const data = yield bcrypt_1.default.compare(basePassword, ancodedPassword);
            return data;
        }
    });
});
userSchema.static("getToken", function (userId, expireIn) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!userId)
            return;
        const token = yield jsonwebtoken_1.default.sign({ userId }, env_1.default.TOKEN, {
            expiresIn: expireIn,
        });
        return token;
    });
});
const USER = (0, mongoose_1.model)("user", userSchema);
exports.default = USER;
