"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const book_route_1 = __importDefault(require("./modules/books/book.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
const corsOptions = {
    origin: "*",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/user", user_route_1.default);
app.use("/book", book_route_1.default);
exports.default = app;
