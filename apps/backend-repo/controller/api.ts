import type { Request, Response } from "express";
import {
  updateUserData,
  fetchUserData,
  addUserData,
  deleteUserData,
} from "../repository/userCollection";
import { User } from "shared";
import { v4 as uuidv4 } from "uuid";

export const addUserController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { data } = req.body;
    const id = uuidv4();
    await addUserData(id, data);
    res.status(200).json({ message: "Create user data successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUserController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const user: User[] | null = (await fetchUserData()) as User[] | null;
  if (!user || user.length === 0) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(user);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id, data } = req.body;
    await updateUserData(id, data);
    res.status(200).json({ message: "Update user data successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.body;
    await deleteUserData(id);
    res.status(200).json({ message: "Delete user data successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
