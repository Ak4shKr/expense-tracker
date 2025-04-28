import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt-token.js";
import Expense from "../models/expense-model.js";

export const getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addExpense = async (req, res) => {
  const { title, amount, date, description, category } = req.body;
  const newExpense = new Expense({
    userId: req.user.id,
    title,
    amount,
    date,
    description,
    category,
  });
  try {
    await newExpense.save();
    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: newExpense,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expense.findOneAndDelete({ id: id });
    if (!deletedExpense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      data: deletedExpense,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, date, description, category } = req.body;

  if (!title && !amount && !date && !description && !category) {
    return res.status(400).json({
      success: false,
      message: "At least one field is required for update.",
    });
  }

  try {
    const existingExpense = await Expense.findOne({ id: id });

    if (!existingExpense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    if (existingExpense.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this expense",
      });
    }

    const updatedFields = {};

    if (title) updatedFields.title = title;
    if (amount) updatedFields.amount = amount;
    if (date) updatedFields.date = date;
    if (description) updatedFields.description = description;
    if (category) updatedFields.category = category;

    updatedFields.updatedAt = Date.now();

    const updatedExpense = await Expense.findOneAndUpdate(
      { id: id },
      updatedFields,
      {
        new: true,
      }
    );
    console.log("Updated Expense:", updatedExpense);
    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error!" + error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUser = await User.findOne({ email: email });

    if (!isUser) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving it
      const newUser = new User({
        email,
        password: hashedPassword,
      });
      await newUser.save();

      const token = generateToken(newUser);

      return res.status(201).json({
        success: true,
        message: "user loggedIn",
        data: {
          user: newUser,
          token,
        },
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, isUser.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(isUser);

    res.status(200).json({
      success: true,
      message: "user loggedIn",
      data: {
        user: isUser,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getExpenseStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.find({ userId });

    const totalItems = expenses.length;
    const categoryTotals = {};
    let totalAmount = 0;

    expenses.forEach((expense) => {
      totalAmount += expense.amount;
      categoryTotals[expense.category] =
        (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const categoryStats = Object.keys(categoryTotals).map((category) => ({
      category,
      amount: categoryTotals[category],
      percentage: ((categoryTotals[category] / totalAmount) * 100).toFixed(2),
    }));

    // ---------- MONTH WISE STATS ----------
    const monthTotals = {};

    expenses.forEach((expense) => {
      const monthKey = `${expense.date.getFullYear()}-${String(
        expense.date.getMonth() + 1
      ).padStart(2, "0")}`;
      monthTotals[monthKey] = (monthTotals[monthKey] || 0) + expense.amount;
    });

    const monthStats = Object.keys(monthTotals)
      .map((month) => ({
        month,
        amount: monthTotals[month],
      }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));
    res.status(200).json({
      success: true,
      data: {
        categoryStats,
        monthStats,
        totalAmount,
        totalItems,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
