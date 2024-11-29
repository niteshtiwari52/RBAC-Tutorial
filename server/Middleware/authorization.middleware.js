const JwtPassport = require("passport-jwt");
const dotenv = require("dotenv");
const Model = require("../Models/index");

dotenv.config();

const JWTStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// Passport JWT strategy middleware
module.exports.privateRoute = (passport) => {
  passport.use(
    new JWTStrategy(options, async (jwt__payload, done) => {
      try {
        const doesUserExist = await Model.UserModel.findById(jwt__payload.user);

        if (!doesUserExist) return done(null, false);
        return done(null, doesUserExist);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

// Role-based middleware for authorization
module.exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user; // After successful passport authentication, `req.user` will have the user info

    if (!allowedRoles.includes
      (user.role)) {
      return res
        .status(403)
        .json({
          success : false,
          message: `Access Denied. Sorry, Only ${allowedRoles} has the access.`,
        });
    }

    next(); // If role matches, move on to the next middleware or controller
  };
};
