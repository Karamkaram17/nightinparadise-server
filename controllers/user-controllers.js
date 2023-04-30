const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addUser = async (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  const roles = req.body.roles;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      username: username,
      password: hashedPassword,
      roles: roles,
    });
    res.status(201).json({
      success: `user : ${result.username} has been successfully created`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
      return res.status(404).send(`${username} is not a user`);
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const username = req.params.username.toLowerCase();
  const updatedUser = req.body;
  req.body.username ? delete updatedUser.username : null;
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    updatedUser.password = hashedPassword;
  }
  try {
    const user = await User.findOneAndUpdate(
      { username: username },
      updatedUser,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      return res.status(404).send(`${username} is not a user`);
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    const user = await User.findOneAndDelete({ username: username });
    if (!user) {
      return res.status(404).send(`${username} does not exist`);
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAllUsers, addUser, getOneUser, updateUser, deleteUser };
