const Request = require("../../models/request.model");

const updateRequest = async (req, res) => {
  const skillOwnerId = req.user._id;
  const requestId = req.params.id;

  const { status } = req.body;

  if (!skillOwnerId) {
    return res.status(403).json({
      success: false,
      message: "Please log in first to get requests of a skill.",
    });
  }


  if(!["accepted", "rejected"].includes(status)){
    return res.status(400).json({
        success: false,
        message: "Status must be either 'accepted' or 'rejected'",
      });
  }


  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    // check if both skill creator and requestor are not same

    if (request.reciever.toString() !== skillOwnerId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this request",
      });
    }

    // update stats & responsed at

    request.status = status;
    request.requestedAt = new Date();
    await request.save();

    res.status(200).json({
      success: true,
      message: `Request ${status}`,
      request,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = updateRequest;
