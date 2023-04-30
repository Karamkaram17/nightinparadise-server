const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Login = mongoose.model("logins", LoginSchema);

module.exports = Login;
