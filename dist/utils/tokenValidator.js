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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const user_schema_1 = __importDefault(require("../modules/user/user.schema"));
const tokenValidator = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userI = jsonwebtoken_1.default.verify(token, env_1.default.TOKEN);
        if (userI && userI.userId) {
            const user = yield user_schema_1.default.findById(userI.userId).lean();
            if (!user) {
                throw "Token invalid";
            }
            else {
                return user;
            }
        }
        else {
            throw "Token invalid";
        }
    }
    catch (error) {
        throw error;
    }
});
exports.default = tokenValidator;
