/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable new-cap */
/* eslint-disable object-curly-spacing */
import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../../middleware/authMiddleware";
import {
  updateUserController,
  getAllUserController,
  addUserController,
  deleteUserController,
} from "../../controller/api";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello user");
});
router.post("/login", (req, res) => {
  try {
    const payload = req.body;

    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(payload, secret);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/create-user-data", authMiddleware, addUserController);
router.get("/fetch-user-data", authMiddleware, getAllUserController);
router.put("/update-user-data", authMiddleware, updateUserController);
router.delete("/delete-user-data", authMiddleware, deleteUserController);

export default router;
