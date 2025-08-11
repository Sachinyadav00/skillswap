const Skill = require("../../models/skills.model");
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
      .populate("createdBy", "username email") // only get name & email
      .exec();

    if (!skills || skills.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Skill Found"
      });
    }

    res.status(200).json({
      success: true,
      skills
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

module.exports = getAllSkills;
