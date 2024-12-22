/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { app } from "@/firebase";
import { getAuth, User, updateProfile } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({
  user: null,
  name: "",
  photoURL: "",
  email: "",
  setName: (name: string) => {},
  setPhotoURL: (photoURL: string) => {},
  setEmail: (email: string) => {},
  refreshUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");

  const refreshUser = () => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    setUser(user);
    setName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
    setEmail(user?.email || "");
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user as User);
      setName(user?.displayName || "");
      setPhotoURL(user?.photoURL || "");
      setEmail(user?.email || "");
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={{ user: user as any, name, photoURL, email, setName, setPhotoURL, setEmail, refreshUser }}>{children}</UserContext.Provider>;
};
