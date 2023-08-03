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
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const authValidate_1 = __importDefault(require("../../middlewares/authValidate"));
const userRoute = (0, express_1.Router)();
userRoute.get("/", (0, authValidate_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(req.user);
    }
    catch (error) {
        res.send(error);
    }
}));
userRoute.patch("/logout", (0, authValidate_1.default)(), user_controller_1.logoutUser);
userRoute.post("/login", user_controller_1.loginUser);
userRoute.post("/registration", user_controller_1.registration);
exports.default = userRoute;
