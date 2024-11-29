const express = require("express");
const router = express.Router();
const Controllers = require("../../Controllers");
const passport = require("passport");
const { authorizeRoles } = require("../../Middleware/authorization.middleware");

router.post(
  "/addNewUser",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin", "user"),
  Controllers.AdminController.addNewUser
);
router.get(
  "/getAllUser",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin" , "project_manager"),
  Controllers.AdminController.getAllUsers
);
router.get(
  "/getParticularUser",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin"),
  Controllers.AdminController.getUserByEmailOrMobile
);
router.put(
  "/updateUser/:userId",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin", "user"),
  Controllers.AdminController.updateUser
);
router.delete(
  "/deleteUser/:userId",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin"),
  Controllers.AdminController.deleteUser
);




module.exports = router;