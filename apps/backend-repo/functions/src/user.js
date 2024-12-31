"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable new-cap */
/* eslint-disable object-curly-spacing */
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const api_1 = require("../../controller/api");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Hello user");
});
router.post("/login", (req, res) => {
    try {
        const payload = req.body;
        const secret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign(payload, secret);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/create-user-data", authMiddleware_1.authMiddleware, api_1.addUserController);
router.get("/fetch-user-data", authMiddleware_1.authMiddleware, api_1.getAllUserController);
router.put("/update-user-data", authMiddleware_1.authMiddleware, api_1.updateUserController);
router.delete("/delete-user-data", authMiddleware_1.authMiddleware, api_1.deleteUserController);
exports.default = router;
