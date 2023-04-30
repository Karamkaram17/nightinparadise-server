require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const corsOptions = require("./config/corsOptions");
const custom404 = require("./middleware/custom-404");
const connectDB = require("./config/DBconnection");
const credentials = require("./middleware/credentials");
const port = process.env.PORT || 5000;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static("./public"));
app.use("/data", require("./routes/wake-up-route"));
app.use("/reservations", require("./routes/api/reservation-route"));
app.use("/customers", require("./routes/api/customers-route"));
app.use("/expenses", require("./routes/api/expenses-route"));
app.use("/revenues", require("./routes/api/revenues-route"));
app.use("/auth", require("./routes/auth-route"));
app.use("/profile", require("./routes/api/profile-route"));
app.use("/refresh", require("./routes/refresh-route"));
app.use("/logout", require("./routes/logout-route"));
app.use("/users", require("./routes/api/user-route"));
app.use("/tracking", require("./routes/api/tracking-route"));

app.all("*", custom404);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
};

start();
