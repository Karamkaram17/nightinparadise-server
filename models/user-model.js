const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "must provide a name"],
      trim: true,
      maxlength: [25, "name cannot be more than 25 characters"],
      minlength: [5, "username cannot be less than 5 characters"],
    },
    password: {
      type: String,
      required: [true, "must provide a password"],
    },
    roles: {
      user: {
        type: Number,
        default: 1984,
      },
      admin: {
        type: Number,
      },
      editor: {
        type: Number,
      },
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const user = mongoose.model("users", UserSchema);

module.exports = user;
