const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "must provide a name"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "must provide a date"],
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "must provide a price"],
    },
    createdBy: {
      type: String,
      required: false,
      trim: true,
    },
    updatedBy: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("expenses", ExpenseSchema);

module.exports = Expense;
