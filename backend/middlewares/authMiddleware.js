const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/users.model");
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(409).json({
      message: "No token genereted",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("-password");
     if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
};

module.exports = authMiddleware;
