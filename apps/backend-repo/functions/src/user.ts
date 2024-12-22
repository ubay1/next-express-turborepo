/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable new-cap */
/* eslint-disable object-curly-spacing */
import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import {
  updateUserController,
  getAllUserController,
  addUserController,
  deleteUserController,
} from "../../controller/api";

const router = Router();

router.post("/create-user-data", authMiddleware, addUserController);
router.get("/fetch-user-data", authMiddleware, getAllUserController);
router.put("/update-user-data", authMiddleware, updateUserController);
router.delete("/delete-user-data", authMiddleware, deleteUserController);

export default router;
