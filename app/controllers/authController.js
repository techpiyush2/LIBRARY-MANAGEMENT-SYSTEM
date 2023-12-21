const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errorHandler } = require("../utils/errorHandler");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Checking existing user

    const existingEmail = await User.findOne({ email });

    if (existingEmail) return res.json({ error: "user already exist" });

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Saving the user to the database
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    await user.save();

    // access token and refresh token
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.json({
      message: "signup successfully",
      accessToken,
      refreshToken,
      role: user.role,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Finding  the user by email
    const user = await User.findOne({ email });

    // Checking if the user exists and verify the password
    if (user && (await bcrypt.compare(password, user.password))) {
      // access token and refresh token
      const accessToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );

      res.json({
        message: "signin successfully",
        accessToken,
        refreshToken,
        role: user.role,
      });
      
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { signUp, signIn };
