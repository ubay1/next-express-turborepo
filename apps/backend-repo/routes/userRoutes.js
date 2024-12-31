"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_1 = require("../controller/api");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/login", (req, res) => {
  try {
    const { data } = req.body;
    const payload = data;
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "24h" };
    const token = jsonwebtoken_1.default.sign(payload, secret, options);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put(
  "/update-user-data",
  authMiddleware_1.authMiddleware,
  api_1.updateUserController
);
router.get(
  "/fetch-user-data",
  authMiddleware_1.authMiddleware,
  api_1.getAllUserController
);
exports.default = router;
