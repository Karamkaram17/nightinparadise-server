const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verify-jwt");
const ROLES_LIST = require("../../config/roles-list");
const verifyRoles = require("../../middleware/verify-roles");

const {
  getAllReservations,
  addReservation,
  getOneReservation,
  updateReservation,
  deleteReservation,
} = require("../../controllers/reservations-controllers");

router
  .route("/")
  .get(verifyJWT, verifyRoles(ROLES_LIST.user), getAllReservations)
  .post(
    verifyJWT,
    verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor),
    addReservation
  );
router
  .route("/:number/date/:date")
  .get(verifyJWT, verifyRoles(ROLES_LIST.user), getOneReservation)
  .patch(
    verifyJWT,
    verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor),
    updateReservation
  )
  .delete(
    verifyJWT,
    verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor),
    deleteReservation
  );

module.exports = router;
