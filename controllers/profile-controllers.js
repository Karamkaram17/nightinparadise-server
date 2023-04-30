const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const username = req.user;
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;

  if (!newPassword || !oldPassword) {
    return res
      .status(400)
      .json({ message: "old and new passwords are required" });
  }

  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(404).send(`${username} is not a user`);
    }

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.sendStatus(401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { password: hashedPassword },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).send(`${username} is not a user`);
    }
    res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { changePassword };
