import mongoose from "mongoose";

import mongooseSequence from "mongoose-sequence"; // Renamed for clarity
const AutoIncrement = mongooseSequence(mongoose);

const expenseSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

expenseSchema.plugin(AutoIncrement, { inc_field: "id" });

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
