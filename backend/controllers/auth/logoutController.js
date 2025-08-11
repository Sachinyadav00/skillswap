const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Logout successfully done .",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = logout;
