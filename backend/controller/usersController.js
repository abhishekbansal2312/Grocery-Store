import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").populate("items");

    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch Users", error });
  }
};

export const UserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const populatedUser = await User.findById(user._id).populate("items");

    res.status(201).json({
      message: "User created successfully",
      user: populatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to create User", error });
  }
};

export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    const populatedUser = await User.findById(user._id).populate("items");

    res.cookie("xoxo", token, {
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 86400000),
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: populatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to login User", error });
  }
};
