const express = require("express");
const {
  registerValidator,
  loginValidator,
} = require("../validators/user.validator");
const register = require("../controllers/auth/registerController");
const login = require("../controllers/auth/loginController");
const logout = require("../controllers/auth/logoutController");
const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/logout", logout);

module.exports = router;
