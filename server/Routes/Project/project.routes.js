const express = require("express");
const router = express.Router();
const Controllers = require("../../Controllers");
const passport = require("passport");
const { authorizeRoles } = require("../../Middleware/authorization.middleware");

// Apply JWT authentication and role authorization for all routes in this router



/**
   * @api {post} /project/createProject  
   * @apiName Create a new project
   * @apiDescription Create a new project
   * @apiGroup Project
   * @apiPermission Admin, project_manager   *
   * @apiHeader {String} Authorization   User's access token
   */
router.post(
  "/createProject",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin", "project_manager"),
  Controllers.ProjectController.createProject
);

// 
/**
   * @api {get} /project/getAllProjects  
   * @apiName Get All projects
   * @apiDescription Route to get all projects (only accessible by admin and project_manager, user)
   * @apiGroup Project
   * 
   * @apiPermission Admin, project_manager, user
   * @apiHeader {String} Authorization   User's access token
   */
router.get(
  "/getAllProjects",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin", "project_manager", "user"),
  Controllers.ProjectController.getAllProjects
);


/**
   * @api {get} /project/getParticularProject/:projectId  
   * @apiName Get particular projects
   * @apiDescription Route to get particular projects using project id (only accessible by admin and project_manager, user)
   * @apiGroup Project
   * 
   * @apiPermission Admin, project_manager, user
   * @apiHeader {String} Authorization   User's access token
   */
router.get(
  "/getParticularProject/:projectId",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin", "project_manager" , "user"),
  Controllers.ProjectController.getProjectById
);

// Route to update a project by ID (only accessible by admin and project_manager)
router.put(
  "/updateProject/:projectId",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin", "project_manager"),
  Controllers.ProjectController.updateProject
);

// Route to delete a project by ID (only accessible by admin and project_manager)
router.delete(
  "/deleteProject/:projectId",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin"),
  Controllers.ProjectController.deleteProject
);



module.exports = router;