const Revenue = require("../models/revenue-model");

const getAllRevenues = async (req, res) => {
  try {
    const roles = req.roles;
    let sentRevenues = [];
    const revenues = await Revenue.find();
    if (!revenues) {
      return res.status(204).json({ message: "no revenues found" });
    }
    if (roles.includes(5150)) {
      sentRevenues = revenues;
    } else {
      revenues.forEach((r) => {
        sentRevenues.push({
          title: r.title,
          date: r.date,
          price: r.price,
        });
      });
    }
    res.status(200).json({ revenues: sentRevenues });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addRevenue = async (req, res) => {
  const user = req.user;
  const title = req.body.title;
  const date = req.body.date;
  const price = req.body.price;
  if (!title || !date || price === undefined) {
    return res.status(400).json({ message: "more info is required" });
  }
  try {
    const result = await Revenue.create({ ...req.body, createdBy: user });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneRevenue = async (req, res) => {
  try {
    const _id = req.params.id;
    const revenue = await Revenue.findOne({ _id }).exec();
    if (!revenue) {
      return res.status(404).send(`no revenue found`);
    }
    res.status(200).json({ revenue });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateRevenue = async (req, res) => {
  const user = req.user;
  const _id = req.params.id;
  try {
    const revenue = await Revenue.findOneAndUpdate(
      { _id },
      { ...req.body, updatedBy: user },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!revenue) {
      return res.status(404).send(`no revenue found`);
    }
    res.status(200).json(revenue);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteRevenue = async (req, res) => {
  try {
    const _id = req.params.id;
    const revenue = await Revenue.findOneAndDelete({ _id });
    if (!revenue) {
      return res.status(404).send(`no revenue found`);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllRevenues,
  addRevenue,
  getOneRevenue,
  updateRevenue,
  deleteRevenue,
};
