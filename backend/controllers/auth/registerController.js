const User = require("../../models/users.model");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exist.",
      });
    }

    // hash the password
    const user = new User({ username, email, password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({
      message: "Registered Successfully",
    });
  } catch (err) {
    console.log("Register error : ", err);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

module.exports = register;
