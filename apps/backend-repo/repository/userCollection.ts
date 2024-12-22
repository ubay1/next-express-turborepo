import { db } from "../config/firebaseConfig";
import { User } from "shared";

export const addUserData = async (id: string, data: Partial<User>) => {
  await db.collection("USERS").doc(id).set(data);
};

export const fetchUserData = async (): Promise<User | null> => {
  const users: any = await db.collection("USERS").get();

  return users.docs.map((doc: any) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

export const updateUserData = async (id: string, data: Partial<User>) => {
  await db.collection("USERS").doc(id).update(data);
};

export const deleteUserData = async (id: string) => {
  await db.collection("USERS").doc(id).delete();
};
