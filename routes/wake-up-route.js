const express = require("express");
const router = express.Router();

const { wakeUp } = require("../controllers/wake-up-controllers");

router.route("/").get(wakeUp);

module.exports = router;
