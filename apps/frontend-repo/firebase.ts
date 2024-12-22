import { initializeApp } from "firebase/app";
import { clientConfig } from "./utils/firebase-config";

export const app = initializeApp(clientConfig);
