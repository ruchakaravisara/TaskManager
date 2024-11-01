const bcrypt = require("bcrypt"); // Ensure bcrypt is installed
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

// Mock user storage (replace with your database logic)

// Mock user storage (replace with your database logic)

// Signup Route
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  console.log("Signup attempt:", { username, password }); // Log signup attempt

  // Check if user already exists
  let users = await UserModel.find({});
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    console.log("User already exists"); // Log user existence check
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword }); // Store the user

    const model = new UserModel({ username, password: hashedPassword });
    await model.save();

    // Generate token
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Signup successful, token generated:", token); // Log token
    return res.json({ token });
  } catch (error) {
    console.error("Error during signup:", error); // Log error
    return res
      .status(500)
      .json({ message: "Signup failed. Please try again." });
  }
};

// Login Route
// Login function
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let users = await UserModel.find({});
    // Find user by username
    const user = users.find((user) => user.username === username);
    if (!user) {
      console.log("User not found:", username);
      return res.status(400).json({ message: "User not found" });
    }

    // Compare provided password with stored hashed password
    const isMatch = bcrypt.compare(password, user.password);
    console.log("Password match status for user", username, ":", isMatch);
    console.log(user);

    if (!isMatch) {
      console.log("Invalid credentials for user:", username);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token for the logged-in user
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token: token, id: user.id });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Login failed. Please try again." });
  }
};

module.exports = { registerUser, loginUser };
