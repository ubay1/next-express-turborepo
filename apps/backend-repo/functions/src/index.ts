/* eslint-disable object-curly-spacing */
import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import userRoutes from "./user";
const app = express();

app.use("/user", userRoutes);

exports.app = onRequest(app);
