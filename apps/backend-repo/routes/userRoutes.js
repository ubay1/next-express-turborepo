"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../controller/api");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.put("/update-user-data", authMiddleware_1.authMiddleware, api_1.updateUserController);
router.get("/fetch-user-data", authMiddleware_1.authMiddleware, api_1.getAllUserController);
exports.default = router;
