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
exports.logoutUserDB = exports.getAllUserDB = exports.loginUserDB = exports.registrationDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = __importDefault(require("./user.schema"));
const env_1 = __importDefault(require("../../config/env"));
const registrationDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const isExist = yield user_schema_1.default.findOne({ email: user.email }).lean();
    if (isExist) {
        throw "This email is exist";
    }
    try {
        const result = yield user_schema_1.default.create([user], { session });
        if (!result || result.length === 0) {
            throw new Error("Internal server error");
        }
        const decodedPassword = yield user_schema_1.default.passwordDecord(result[0].password);
        result[0].password = decodedPassword;
        yield result[0].validate();
        yield result[0].save({ session });
        const token = yield user_schema_1.default.getToken(result[0]._id, env_1.default.TOKEN_EXPIRE);
        result[0].token = token;
        yield result[0].save({ session });
        const nuser = yield user_schema_1.default.findById(result[0]._id, { password: 0 }, { session }).lean();
        if (!nuser) {
            throw "Registration failed";
        }
        yield session.commitTransaction();
        return nuser;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        yield session.endSession();
    }
});
exports.registrationDB = registrationDB;
const loginUserDB = ({ email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        const user = yield user_schema_1.default.findOne({ email }, {}, { session });
        if (!user) {
            throw "This user is not a subscriber. try to registration!";
        }
        const match = yield user_schema_1.default.passwordMatch(password, user.password);
        if (!match) {
            throw "Password didn't match";
        }
        const token = yield user_schema_1.default.getToken(user._id, env_1.default.TOKEN_EXPIRE);
        user.token = token;
        yield user.save({ session });
        yield session.commitTransaction();
        return user;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        yield session.endSession();
    }
});
exports.loginUserDB = loginUserDB;
const getAllUserDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_schema_1.default.find({}, { password: 0 });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUserDB = getAllUserDB;
const logoutUserDB = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_schema_1.default.findOne({ email });
        if (!result) {
            throw "Logout unsuccessfully";
        }
        result.token = "";
        result.save();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.logoutUserDB = logoutUserDB;
