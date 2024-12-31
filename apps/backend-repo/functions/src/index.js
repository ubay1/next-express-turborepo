"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable object-curly-spacing */
const https_1 = require("firebase-functions/v2/https");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const user_1 = __importDefault(require("./user"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/user", user_1.default);
exports.app = (0, https_1.onRequest)(app);
