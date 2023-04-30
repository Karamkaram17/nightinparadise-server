const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verify-jwt");

const { changePassword } = require("../../controllers/profile-controllers");

router.route("/change-password").post(verifyJWT, changePassword);

module.exports = router;
