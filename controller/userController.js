const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

// User registration controller
const register = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using Sequelize
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    res.send(`User registered successfully with email: ${user.email}`);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error: User registration failed",
    });
  }
};

// User login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email using Sequelize
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Compare the entered password with the stored hashed password
    const userIsValid = await bcrypt.compare(password, user.password);

    if (userIsValid) {
      // Create a JWT with user data and secret key
      const accessToken = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          exp: Math.floor(Date.now() / 1000) + 6 * 60 * 60,
        },
        process.env.secretKey
      );
      const userWithoutPassword = _.omit(user.dataValues, "password");

      // Send the accessToken in the response
      res.json({
        accessToken,
        message: "User logged in successfully",
        user: userWithoutPassword,
      });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error: User login failed" });
  }
};

// Get user information controller
const me = async (req, res) => {
  try {
    // Retrieve the user ID from the decoded token
    const userId = req.body.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Omit the 'password' property from the user object
    const userWithoutPassword = _.omit(user.dataValues, "password");

    // Send the user information in the response
    res.json({
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error: Unable to retrieve user information",
    });
  }
};

module.exports = {
  register,
  login,
  me,
};
