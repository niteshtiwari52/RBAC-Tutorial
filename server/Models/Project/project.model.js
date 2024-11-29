// Models/ProjectModel.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
  projectManager : {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User",
    
  },
  assignedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel;
