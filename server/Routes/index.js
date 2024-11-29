const express = require("express");
const router = express.Router();

const UserRoutes = require("./User/user.routes");
const AdminRoutes = require("./Admin/admin.routes")
const ProjectRoutes = require("./Project/project.routes")

router.use("/user", UserRoutes);
router.use("/project" , ProjectRoutes);
router.use("/admin" , AdminRoutes);

module.exports = router;
