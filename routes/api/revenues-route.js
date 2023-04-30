const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verify-jwt");
const ROLES_LIST = require("../../config/roles-list");
const verifyRoles = require("../../middleware/verify-roles");

const {
  getAllRevenues,
  addRevenue,
  getOneRevenue,
  updateRevenue,
  deleteRevenue,
} = require("../../controllers/revenues-controllers");

router
  .route("/")
  .get(verifyJWT, verifyRoles(ROLES_LIST.user), getAllRevenues)
  .post(
    verifyJWT,
    verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor),
    addRevenue
  );
router
  .route("/:id")
  .get(verifyJWT, verifyRoles(ROLES_LIST.user), getOneRevenue)
  .patch(verifyJWT, verifyRoles(ROLES_LIST.admin), updateRevenue)
  .delete(verifyJWT, verifyRoles(ROLES_LIST.admin), deleteRevenue);

module.exports = router;
