const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");


const registerController = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // Validate role
    const validRoles = ["donor","admin", "organisation", "hospital"];
    if (!validRoles.includes(req.body.role)) {
      return res.status(400).send({
        success: false,
        message: "Invalid role",
        error:error.message,
      });
    }

    // Create new user
    const user = new userModel(req.body);
    await user.save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
};

//login call back
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //check role
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "role dosent match",
      });
    }
    //compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // bard AI 
    const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
const token = JWT.sign({ userId: user._id }, jwtSecret, { expiresIn: "1d" });

    
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error: error.message,
    });
  }
};

//GET CURRENT USER
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
