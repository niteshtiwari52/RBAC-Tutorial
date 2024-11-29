const Model = require("../../Models");

module.exports.addNewUser = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;
    const isUserExist = await Model.UserModel.findByEmailAndPhone({
      email,
      mobile,
    });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User Already exist",
      });
    }
    const data = {
      name,
      email,
      mobile,
      password,
      role,
    };

    const newUser = await Model.UserModel.create(data);
    const token = newUser.generateJwtToken();
    return res.status(200).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
(module.exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, mobile, role , isEmailVerified} = req.body;
    const dataToBeUpdated = {};
    if (name) {
      dataToBeUpdated.name = name;
    }
    if (email) {
      dataToBeUpdated.email = email;
    }
    if (mobile) {
      dataToBeUpdated.mobile = mobile;
    }
    if (role) {
      dataToBeUpdated.role = role;
    }
    if (isEmailVerified) {
      dataToBeUpdated.isEmailVerified = isEmailVerified;
    }
    const user = await Model.UserModel.findByIdAndUpdate(
      userId,
      dataToBeUpdated,
      { new: true }
    );
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res
      .status(200)
      .json({ success: true, message: "Details updated Successfully.", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update user", error });
  }
}),
  (module.exports.deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await UserModel.findByIdAndDelete(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user", error });
    }
  }),
  // Controller to fetch the total number of users
  // Get All Users with Role Filter
module.exports.getAllUsers = async (req, res) => {
    try {
      // Get the role filter from query params; default to "user"
      const role = req.query.role || "user";
      
      // Fetch users based on the specified or default role
      const users = await Model.UserModel.find({ role });
      const userCount = users.length;
  
      return res.status(200).json({
        success: true,
        message: `Total number of ${role} users: ${userCount}`,
        totalUsers: userCount,
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching users",
        error: error.message,
      });
    }
  };

// Controller to fetch a user by email or mobile number
exports.getUserByEmailOrMobile = async (req, res) => {
  const { email, mobile } = req.query;

  try {
    const query = {};
    if (email) query.email = email;
    if (mobile) query.mobile = mobile;

    const user = await Model.CompanyModel.findOne(query);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};
