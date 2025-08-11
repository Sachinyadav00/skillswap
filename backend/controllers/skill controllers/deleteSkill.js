const Skill = require("../../models/skills.model");

const deleteSkill = async (req, res) => {
  const userId = req.user._id;
  const skillId = req.params.id;

  try {
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "No Skill Found to be deleted",
      });
    }

    if (skill.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You cannot delete this skill",
      });
    }

    await Skill.findByIdAndDelete(skillId);

    res.status(200).json({
      success: true,
      message: "DELETED SUCCESSFULLY!",
    });
  } catch (err) {
    console.error("Error updating skill:", err);
    res.status(500).json({
      success: false,
      message: "Server error while deleting skill",
    });
  }
};

module.exports = deleteSkill;
