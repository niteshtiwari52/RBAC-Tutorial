const Model = require("../../Models");

module.exports.signUp = async (req, res) => {
  try {
    const {name , email , mobile, password , role} = req.body
    const isUserExist = await Model.UserModel.findByEmailAndPhone({email , mobile});
    if(isUserExist){
      return res.status(400).json({
        success : false, 
        message : "User Already exist"
      })
    }
    const data = {
      name , email , mobile ,password
    }

    if(role){
      data.role = role;
    }
    const newUser = await Model.UserModel.create(data);
    const token = newUser.generateJwtToken();
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success : false, message : "Internal Server Error",error: error.message });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const {credentials} = req.body;
    // await ValidateSignin(req.body.credentials);
    const user = await Model.UserModel.findByEmailAndPassword(
      credentials
    );

    const token = user.generateJwtToken();
    return res.status(200).json({ success : true , token,});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success : false, message : "Internal Server Error",error: error.message });
  }
};

module.exports.getProfile = async(req , res) => {
  try {
    const user = await Model.UserModel.findById(req.user._id)
    return res.status(200).json({
      success : true,
      message : "Profile Fetched Successfully",
      user

    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : "Internal Server Error",
      error : error.message,
    })
  }
}

module.exports.getSelfUserDetails = async (req, res) => {
  try {
    // Get user ID from the token or request object (assuming authentication middleware)
    const userId = req.user._id; 
    const user = await Model.UserModel.findById(userId).select("name email mobile role");

    if (!user) {
      return res.status(404).json({success : false , message: "User not found" });
    }

    // Basic details
    const basicDetails = {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    };

    let additionalDetails = {};

    if (user.role === "admin") {
      // Admin additional details
      const totalAdmins = await Model.UserModel.countDocuments({ role: "admin" });
      const totalProjectManagers = await Model.UserModel.countDocuments({ role: "project_manager" });
      const totalUsers = await Model.UserModel.countDocuments({ role: "user" });
      const totalProjects = await Model.ProjectModel.countDocuments();

      additionalDetails = {
        totalAdmins,
        totalProjectManagers,
        totalUsers,
        totalProjects,
      };
    } else if (user.role === "project_manager" ) {
      // Project manager or user additional details
      const totalProjects = await Model.ProjectModel.countDocuments({ projectManager: userId });

      additionalDetails = {
        totalProjects,
      };
    }else if(user.role === "user"){
      const totalProjects = await Model.ProjectModel.countDocuments({ assignedUsers: userId });

      additionalDetails = {
        totalProjects,
      };
    }

    return res.status(200).json({success: true, ...basicDetails, ...additionalDetails });
  } catch (error) {
    return res.status(500).json({success: false, message: "Server Error", error: error.message });
  }
};






