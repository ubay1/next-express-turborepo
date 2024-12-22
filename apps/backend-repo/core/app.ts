import express from "express";
import cors from "cors";
import userRoutes from "../routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

export default app;
