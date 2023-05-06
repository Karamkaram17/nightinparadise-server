const Expense = require("../models/expense-model");

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    if (!expenses) {
      return res.status(204).json({ message: "no expenses found" });
    }
    res.status(200).json({ expenses });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addExpense = async (req, res) => {
  const user = req.user;
  const title = req.body.title;
  const date = req.body.date;
  const price = req.body.price;
  if (!title || !date || price === undefined) {
    return res.status(400).json({ message: "more info is required" });
  }
  try {
    const result = await Expense.create({ ...req.body, createdBy: user });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneExpense = async (req, res) => {
  try {
    const _id = req.params.id;
    const expense = await Expense.findOne({ _id }).exec();
    if (!expense) {
      return res.status(404).send(`no expense found`);
    }
    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateExpense = async (req, res) => {
  const user = req.user;
  const _id = req.params.id;
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id },
      { ...req.body, updatedBy: user },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!expense) {
      return res.status(404).send(`no expense found`);
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteExpense = async (req, res) => {
  try {
    const _id = req.params.id;
    const expense = await Expense.findOneAndDelete({ _id });
    if (!expense) {
      return res.status(404).send(`no expense found`);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllExpenses,
  addExpense,
  getOneExpense,
  updateExpense,
  deleteExpense,
};
