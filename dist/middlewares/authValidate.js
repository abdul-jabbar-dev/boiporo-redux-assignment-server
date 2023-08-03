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
const tokenValidator_1 = __importDefault(require("../utils/tokenValidator"));
const authValidate = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtTokenString = req.headers;
        if (jwtTokenString.token) {
            const user = yield (0, tokenValidator_1.default)(jwtTokenString === null || jwtTokenString === void 0 ? void 0 : jwtTokenString.token);
            req.user = user;
            next();
        }
        else
            throw "token requried";
    }
    catch (error) {
        res.send("Token requried");
    }
});
exports.default = authValidate;
