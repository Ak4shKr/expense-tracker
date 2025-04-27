import express from "express";
import {
  addExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseStats,
  login,
  updateExpense,
} from "../controller/expense-controller.js";
import { authToken } from "../middleware/auth-middleware.js";

const router = express.Router();

router.get("/all-expenses", authToken, getAllExpenses);
router.post("/add-expense", authToken, addExpense);
router.delete("/delete-expense/:id", authToken, deleteExpense);
router.put("/update-expense/:id", authToken, updateExpense);

router.get("/chart-data", authToken, getExpenseStats);

router.post("/login", login);

export default router;
