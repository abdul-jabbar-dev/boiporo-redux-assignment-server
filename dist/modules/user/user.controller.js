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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.logoutUser = exports.loginUser = exports.registration = void 0;
const user_service_1 = require("./user.service");
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_service_1.registrationDB)(req.body);
        res.send(result);
    }
    catch (error) {
        res.json(error);
    }
});
exports.registration = registration;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.password || !req.body.email) {
            res.send("email or password is missing");
        }
        else {
            const { password, email } = req.body;
            const result = yield (0, user_service_1.loginUserDB)({ email, password });
            res.send(Object.assign(Object.assign({}, result.toObject()), { password: undefined }));
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user.email) {
            res.send("email or password is missing");
        }
        else {
            const { email } = req.user;
            const result = yield (0, user_service_1.logoutUserDB)({ email });
            res.send({
                email: result.email,
                status: "login successfully",
            });
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.logoutUser = logoutUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        const users = yield (0, user_service_1.getAllUserDB)();
        res.json(users);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getAllUser = getAllUser;
