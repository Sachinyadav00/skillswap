const User = require("../../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      _id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: "development",
    });

    return res.status(200).json({
      success: true,
      message: "Logged in Successfully!",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      messagqe: `Internal Server Error : ${error.details[0].message}`,
    });
  }
};

module.exports = login;
