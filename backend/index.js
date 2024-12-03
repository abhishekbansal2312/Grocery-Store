import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemsRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4100;
const MONGO_URI = process.env.MONGO_URI;

app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found in index,js");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
dotenv.config();
