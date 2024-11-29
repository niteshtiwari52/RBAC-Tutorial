const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { genSalt } = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },

  mobile: {
    type: String,
    required: true,
  },
  password: { type: String,  select: false },

  emailOtp: {
    type: String,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "project_manager", "user"],
    default: "user",
  },
});
// Attachments
UserSchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, process.env.JWT_SECRET);
};

// helper functions

UserSchema.statics.findByEmailAndPhone = async ({ email, mobile }) => {
  const checkUserByEmail = await UserModel.findOne({ email });
  const checkUserByPhone = await UserModel.findOne({ mobile });

  if (checkUserByEmail || checkUserByPhone) {
    return true
  }
};

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
  const user = await UserModel.findOne({ email }).select("password");

  if (!user) {
    throw new Error("User does not Exists.... !");
  }

  // compare password
  const doesPasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesPasswordMatch) {
    throw new Error("Invalid Credentials !!!");
  }

  return user;
};

UserSchema.pre("save", function (next) {
  // gives the data of current user
  const user = this;

  //password is modified
  if (!user.isModified("password")) return next();

  //generate bcrypt salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    // hash the password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      // assigning hashed password
      user.password = hash;

      return next();
    });
  });
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
