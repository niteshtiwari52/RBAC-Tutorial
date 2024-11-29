const Model = require("../../Models");
// Create a new project
(module.exports.createProject = async (req, res) => {
  try {
    const { name, description, status, projectManager, assignedUsers } =
      req.body;
    const project = await Model.ProjectModel.create({
      name,
      description,
      status,
      assignedUsers,
      projectManager,
      createdBy: req.user._id,
    });
    const newProject = await Model.ProjectModel.findById(project._id)
    .populate("projectManager", "name email") // Replace with the fields you want to send
    .populate("assignedUsers", "name email"); // Also populate assigned users if needed
    res.status(201).json({
      success: true,
      message: "Project Created Successfully.",
      newProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
}),
  // Get all projects
  (module.exports.getAllProjects = async (req, res) => {
    try {
      const { role, _id } = req.user;

      let projects;

      if (role === "admin") {
        projects = await Model.ProjectModel.find().populate(
          "assignedUsers createdBy projectManager",
          "name email mobile role"
        );
      } else if (role === "project_manager") {
        projects = await Model.ProjectModel.find({
          $or: [{ projectManager: _id }, { assignedUsers: _id }],
        }).populate(
          "assignedUsers createdBy projectManager",
          "name email mobile role"
        );
      } else if (role === "user") {
        projects = await Model.ProjectModel.find({
          assignedUsers: _id,
        }).populate(
          "assignedUsers createdBy projectManager",
          "name email mobile role"
        );
      } else {
        return res.status(403).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const data = {
        totalProjects: projects.length,
        projects,
      };

      res.status(200).json({
        success: true,
        message: "Projects fetched successfully.",
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch projects",
        error: error.message,
      });
    }
  });

// Get a single project by ID
module.exports.getProjectById = async (req, res) => {
  try {
    const { role, _id: userId } = req.user;
    const projectId = req.params.projectId;

    let project;

    if (role === "admin") {
      project = await Model.ProjectModel.findById(projectId).populate(
        "assignedUsers createdBy projectManager",
        "name email mobile role"
      );
    } else if (role === "project_manager") {
      project = await Model.ProjectModel.findOne({
        _id: projectId,
        $or: [{ projectManager: userId }, { assignedUsers: userId }],
      }).populate(
        "assignedUsers createdBy projectManager",
        "name email mobile role"
      );
    } else if (role === "user") {
      project = await Model.ProjectModel.findOne({
        _id: projectId,
        assignedUsers: userId,
      }).populate(
        "assignedUsers createdBy projectManager",
        "name email mobile role"
      );
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    if (!project) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Project not found or you don't have access right now",
        });
    }

    res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message,
    });
  }
};

// Update project by ID
// module.exports.updateProject = async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const { name, description, status, projectManager, assignedUsers } =
//       req.body;
//     const { role, _id: userId } = req.user;

//     let project = await Model.ProjectModel.findById(projectId);

//     if (!project) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Project not found or don't have access" });
//     }

//     if (
//       role === "project_manager" &&
//       project.projectManager.toString() !== userId.toString()
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. You are not the manager of this project.",
//       });
//     }

//     if (name) project.name = name;
//     if (description) project.description = description;
//     if (status) project.status = status;

//     if (role === "admin" && projectManager) {
//       project.projectManager = projectManager;
//     }

    
//     if (assignedUsers && Array.isArray(assignedUsers)) {
//       const existingUserIds = project.assignedUsers.map((user) =>
//         user.toString()
//       );

//       const newUsers = assignedUsers.filter(
//         (userId) => !existingUserIds.includes(userId)
//       );

//       // if (newUsers.length === 0) {
//       //   return res.status(400).json({
//       //     success: false,
//       //     message: "All provided users are already assigned to this project.",
//       //   });
//       // }

//       project.assignedUsers.push(...newUsers);
      
//     }

//     project = await project.save();
  
//     const updatedProject = await Model.ProjectModel.findById(project._id)
//       .populate("projectManager", "name email") // Replace with the fields you want to send
//       .populate("assignedUsers", "name email"); // Also populate assigned users if needed

//     res.status(200).json({
//       success: true,
//       message: "Project updated successfully",
//       updatedProject,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update project",
//       error: error.message,
//     });
//   }
// };

// module.exports.updateProject = async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const { name, description, status, projectManager, assignedUsers } =
//       req.body;
//     const { role, _id: userId } = req.user;

//     // Fetch the project by ID
//     let project = await Model.ProjectModel.findById(projectId);

//     if (!project) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Project not found or don't have access" });
//     }

//     // Check if the user is the project manager, if the role is project_manager
//     if (
//       role === "project_manager" &&
//       project.projectManager.toString() !== userId.toString()
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. You are not the manager of this project.",
//       });
//     }

//     // Update project details
//     if (name) project.name = name;
//     if (description) project.description = description;
//     if (status) project.status = status;

//     // Update project manager if the user is an admin
//     if (role === "admin" && projectManager) {
//       project.projectManager = projectManager;
//     }

//     // Update assigned users
//     if (assignedUsers && Array.isArray(assignedUsers)) {
//       // If the assignedUsers array is empty, reset it to an empty array
//       if (assignedUsers.length === 0) {
//         project.assignedUsers = [];
//       } else {
//         // If there are new assigned users, add them
//         const existingUserIds = project.assignedUsers.map((user) => user.toString());
//         const newUsers = assignedUsers.filter(
//           (userId) => !existingUserIds.includes(userId)
//         );

//         project.assignedUsers.push(...newUsers);
//       }
//     }

//     // Save the project with updated details
//     project = await project.save();

//     // Fetch the updated project with populated fields for projectManager and assignedUsers
//     const updatedProject = await Model.ProjectModel.findById(project._id)
//       .populate("projectManager", "name email") // Populate project manager details
//       .populate("assignedUsers", "name email"); // Populate assigned users details

//     // Return the updated project in the response
//     res.status(200).json({
//       success: true,
//       message: "Project updated successfully",
//       updatedProject,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update project",
//       error: error.message,
//     });
//   }
// };

module.exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description, status, projectManager, assignedUsers } = req.body;
    const { role, _id: userId } = req.user;

    // Fetch the project by ID
    let project = await Model.ProjectModel.findById(projectId);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found or don't have access" });
    }

    // Check if the user is the project manager, if the role is project_manager
    if (
      role === "project_manager" &&
      project.projectManager.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not the manager of this project.",
      });
    }

    // Update project details
    if (name) project.name = name;
    if (description) project.description = description;
    if (status) project.status = status;

    // Update project manager if the user is an admin
    if (role === "admin" && projectManager) {
      project.projectManager = projectManager;
    }

    // Update assigned users
    if (assignedUsers && Array.isArray(assignedUsers)) {
      // Directly replace the assignedUsers array with the new one
      project.assignedUsers = assignedUsers;
    }

    // Save the project with updated details
    project = await project.save();

    // Fetch the updated project with populated fields for projectManager and assignedUsers
    const updatedProject = await Model.ProjectModel.findById(project._id)
      .populate("projectManager", "name email") // Populate project manager details
      .populate("assignedUsers", "name email"); // Populate assigned users details

    // Return the updated project in the response
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};




// Delete project by ID
module.exports.deleteProject = async (req, res) => {
  try {
    const project = await Model.ProjectModel.findByIdAndDelete(
      req.params.projectId
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};
