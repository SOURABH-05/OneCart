

import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateToken, generateToken1 } from "../config/token.js";

// Register
export const Registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    // Validate password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password length must be at least 8 characters" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashPassword });

    // Generate token (await is important!)
    const token = await generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // required for cross-origin
      sameSite: "none", // required for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Generate token
    const token = await generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // required for cross-origin
      sameSite: "none", // required for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Google login/signup
export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });
    let wasNew = false;

    if (!user) {
      user = await User.create({ name, email });
      wasNew = true;
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: wasNew ? "Signup successful" : "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const adminLogin = async(req,res)=>{
  try {
    const {email , password} = req.body;
    if(email === process.env.EMAIL && password === process.env.PASSWORD){

    const token = await generateToken1(email);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // required for cross-origin
      sameSite: "none", // required for cross-origin
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", token });
    }
    return res.status(400).json({message :"invalid Credential"})
  } catch (error) {
    console.log(error)
  }
}