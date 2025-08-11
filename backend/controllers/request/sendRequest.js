const { sendRequestSchema } = require("../../validators/request.validator");
const Skill = require("../../models/skills.model");
const Request = require("../../models/request.model");

const sendRequest = async (req, res) => {
  // check if user logged in
  const senderId = req.user._id;

  if (!senderId) {
    return res.status(403).json({
      success: false,
      message: "Please log in first to request for a skill.",
    });
  }

  // validate input
  const { error, value } = sendRequestSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const { skill: skillId, message, communicationMode } = value;

  try {
    const skill = await Skill.findById(skillId);

    if (!skillId) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // prevent sending request to own skills

    if (skill.createdBy.toString() === senderId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot send skill request to your own skills.",
      });
    }

    // prevent duplicate request

    const existingRequest = await Request.findOne({
      sender: senderId,
      reciever: skill.createdBy,
      skill: skillId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(409).json({
        success: false,
        message: "You have already send request for this skill",
      });
    }

    const newRequest = new Request({
      sender: senderId,
      reciever: skill.createdBy,
      skill: skillId,
      message,
      communicationMode,
    });

    await newRequest.save();

    return res.status(201).json({
      success: true,
      message: "Request sent successfully",
      request: newRequest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { sendRequest };
