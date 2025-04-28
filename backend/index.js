import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
configDotenv();
import expenseRouter from "./routes/expense-routes.js";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://expense-tracker-opal-ten-54.vercel.app", // Frontend URL for production
    // origin: "http://localhost:5173", // Frontend URL for development
    credentials: true,
  })
);

app.use("/api/v1", expenseRouter);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
