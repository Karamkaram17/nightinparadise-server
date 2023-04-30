const express = require("express");
const router = express.Router();

const { getAllCustomers } = require("../../controllers/customers-controllers");
const verifyJWT = require("../../middleware/verify-jwt");

router.route("/").get(verifyJWT, getAllCustomers);

module.exports = router;
