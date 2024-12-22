"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable new-cap */
/* eslint-disable object-curly-spacing */
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const api_1 = require("../../controller/api");
const router = (0, express_1.Router)();
router.post("/create-user-data", authMiddleware_1.authMiddleware, api_1.addUserController);
router.get("/fetch-user-data", authMiddleware_1.authMiddleware, api_1.getAllUserController);
router.put("/update-user-data", authMiddleware_1.authMiddleware, api_1.updateUserController);
router.delete("/delete-user-data", authMiddleware_1.authMiddleware, api_1.deleteUserController);
exports.default = router;
