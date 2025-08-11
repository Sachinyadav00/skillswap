const Request = require("../../../models/request.model");

const getSentRequests = async (req, res) => {
  try {
    const requests = await Request.find({ sender: req.user._id })
      .populate("reciever", "username email")
      .populate("skill", "title");
    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = getSentRequests;
