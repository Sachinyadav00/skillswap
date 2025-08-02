const Request = require("../../models/request.model");

const getRequest = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(403).json({
      success: false,
      message: "Please log in first to get requests of a skill.",
    });
  }

  try {
    const requests = await Request.find({ reciever: userId });

    if (requests.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No incoming request",
        requests: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Here are your requests",
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = getRequest;
