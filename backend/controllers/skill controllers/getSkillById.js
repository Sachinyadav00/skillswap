const Skill = require("../../models/skills.model");

const getSkillById = async (req, res) => {
  try {
    const skillId = req.params.id; // ✅ Correct way to access :id param
    // console.log(skillId);

    const skill = await Skill.findById(skillId)
      .populate("createdBy", "username email") // only get name & email
      .exec();
    // console.log(skill);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "No skill found with this ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill successfully found",
      data: skill,
    });
  } catch (error) {
    console.error("Error in getSkillById:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error: Failed to fetch skill",
    });
  }
};

module.exports = getSkillById;
