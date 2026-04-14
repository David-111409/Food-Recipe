import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

// @route   POST /user/register
// @desc    Create a new user account
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // 2. Check if the user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already registered with this email" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Create the user object
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // 5. Save the user to MongoDB
    await newUser.save();

    const token = jwt.sign({ email, userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ message: "User created successfully!", token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

// @route POST /user/login
// @desc    login to a user account
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Compare the entered password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ email, userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ message: "User login successfully!", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

// @route   GET /user/:id
// @desc    get user by ID
router.get("/:id", async (req, res) => {
  try {
    // 1. Get the ID from the URL params
    const userId = req.params.id;

    // 2. Find user and EXCLUDE the password field for security
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Invalid ID format or Server Error" });
  }
});
export default router;
