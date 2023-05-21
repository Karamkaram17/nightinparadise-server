const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verify-jwt");
const ROLES_LIST = require("../../config/roles-list");
const verifyRoles = require("../../middleware/verify-roles");

const {
  getAllExpenses,
  addExpense,
  getOneExpense,
  updateExpense,
  deleteExpense,
} = require("../../controllers/expenses-controllers");

router
  .route("/")
  .get(verifyJWT, verifyRoles(ROLES_LIST.user), getAllExpenses)
  .post(
    verifyJWT,
    verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor),
    addExpense
  );
router
  .route("/:id")
  .get(verifyJWT, verifyRoles(ROLES_LIST.admin), getOneExpense)
  .patch(verifyJWT, verifyRoles(ROLES_LIST.admin), updateExpense)
  .delete(verifyJWT, verifyRoles(ROLES_LIST.admin), deleteExpense);

module.exports = router;
