const User = require("../models/user-model");
const Login = require("../models/login-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }
  const user = await User.findOne({ username: username }).exec();
  if (!user) {
    return res.sendStatus(401);
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const roles = Object.values(user.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: user.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" }
    );
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1500s" }
    );
    //saving refreshToken with the current user
    user.refreshToken = refreshToken;
    user.save();

    //saving the loggedIn time
    await Login.create({
      username,
      date: new Date(),
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 25 * 60 * 1000,
    });

    res.status(201).json({ accessToken, roles, username });
  } else {
    res.sendStatus(401);
  }
};

const getAllLoginInfo = async (req, res) => {
  try {
    const info = await Login.find();
    if (!info) {
      return res.status(204).json({ message: "no data found" });
    }

    const result = [];
    const groupedInfos = info.reduce((groups, user) => {
      const { username, date } = user;
      lowerCaseName = username.toLowerCase();
      if (!groups[lowerCaseName]) {
        groups[lowerCaseName] = {
          lowerCaseName,
          count: 0,
          dates: [],
        };
      }

      groups[lowerCaseName].count++;
      groups[lowerCaseName].dates.unshift(date);

      return groups;
    }, {});

    // Transform grouped infos into the desired format
    for (const username in groupedInfos) {
      const { count, dates } = groupedInfos[username];

      result.push({ username, count, dates });
    }

    res.status(200).json({ info: result });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { handleLogin, getAllLoginInfo };
