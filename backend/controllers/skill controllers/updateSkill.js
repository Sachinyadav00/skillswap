const Skill = require("../../models/skills.model");
const getSkillById = require("./getSkillById");

const updateSkill = async (req, res) => {
  const userId = req.user._id;
  const skillId = req.params.id;

  const updates = req.body;

  try {
    const skill = await Skill.findById(skillId);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    if (skill.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You cannot update this skill",
      });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(skillId, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: updatedSkill,
    });
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating skill",
    });
  }
};

module.exports = updateSkill;
