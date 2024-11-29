// Replacing import with require
const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");

// Database Connection
const ConnectDB = require("./Config/DBConnection");

// Authorization middleware
const AuthorizeAccess = require("./Middleware");

// Routes
const AllRouter = require("./Routes");

dotenv.config(); // Load environment variables from .env file
AuthorizeAccess.Authorization.privateRoute(passport); // Setup passport authorization middleware

const app = express();
app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET, // Use environment variable for secret
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Set the port
const PORT = process.env.PORT || 4000;

// CORS setup
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(helmet());

// Basic route for the root path
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Assignment Server....",
  });
});

// Adding AllRouter route
app.use("/api/v1", AllRouter); // Assuming AllRouter contains all the route handlers

// Start the server and connect to the database
app.listen(PORT, () => {
  ConnectDB()
    .then(() => {
      console.log(
        `Server is running on PORT: http://localhost:${PORT}\nDatabase Connected Successfully.....`
      );
    })
    .catch((error) => {
      console.log(
        "Server is Running but Database connection failed !!!"
      );
      console.log(error);
    });
});
