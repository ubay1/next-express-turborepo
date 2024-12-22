import express from "express";
import { updateUserController, getAllUserController } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.put("/update-user-data", authMiddleware, updateUserController);
router.get("/fetch-user-data", authMiddleware, getAllUserController);

export default router;
