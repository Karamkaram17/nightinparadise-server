const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verify-jwt");
const ROLES_LIST = require("../../config/roles-list");
const verifyRoles = require("../../middleware/verify-roles");

const {
  getAllUsers,
  addUser,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controllers");

router
  .route("/")
  .get(verifyJWT, verifyRoles(ROLES_LIST.admin), getAllUsers)
  .post(verifyJWT, verifyRoles(ROLES_LIST.admin), addUser);
router
  .route("/:username")
  .get(verifyJWT, verifyRoles(ROLES_LIST.admin), getOneUser)
  .patch(verifyJWT, verifyRoles(ROLES_LIST.admin), updateUser)
  .delete(verifyJWT, verifyRoles(ROLES_LIST.admin), deleteUser);

module.exports = router;
