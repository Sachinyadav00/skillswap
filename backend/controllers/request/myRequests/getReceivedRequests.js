const Request = require("../../../models/request.model");

const getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ reciever: req.user._id })
      .populate("sender", "username email")
      .populate("skill", "title");

    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = getReceivedRequests;
