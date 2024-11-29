// routes/user.routes.js
const express = require("express");
const router = express.Router();
const Controllers = require("../../Controllers");
const passport = require("passport");
const { authorizeRoles } = require("../../Middleware/authorization.middleware");

//-----------------------------------------------------Common Routes for ALl(USER , Project Manage and Admin)------------------------------------------//
router.post("/register", Controllers.UserController.signUp);
router.post("/login", Controllers.UserController.signIn);
router.get(
  "/getProfile",
  passport.authenticate("jwt", { session: false }),
  Controllers.UserController.getProfile
);
router.get(
  "/userDetails",
  passport.authenticate("jwt", { session: false }),
  Controllers.UserController.getSelfUserDetails
);



module.exports = router;
