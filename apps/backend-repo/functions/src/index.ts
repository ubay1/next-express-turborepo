/* eslint-disable object-curly-spacing */
import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import "dotenv/config";
import userRoutes from "./user";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/user", userRoutes);

exports.app = onRequest(app);
