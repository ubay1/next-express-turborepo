import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import { updateUserController, getAllUserController } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", (req, res) => {
  try {
    const { data } = req.body;
    const payload = data;

    const secret = process.env.JWT_SECRET as string;
    const options = { expiresIn: "24h" };
    const token = jwt.sign(payload, secret, options);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/update-user-data", authMiddleware, updateUserController);
router.get("/fetch-user-data", authMiddleware, getAllUserController);

export default router;
