const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verify-jwt");
const ROLES_LIST = require("../../config/roles-list");
const verifyRoles = require("../../middleware/verify-roles");

const { getAllLoginInfo } = require("../../controllers/auth-controllers");

router
  .route("/")
  .get(verifyJWT, verifyRoles(ROLES_LIST.admin), getAllLoginInfo);

module.exports = router;
