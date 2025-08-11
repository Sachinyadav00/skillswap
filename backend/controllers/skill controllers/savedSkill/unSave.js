const SavedSkill = require("../../../models/savedSkill.model");

const unSaveSkill = async (req, res) => {
  const userId = req.user._id;
  const {skillId} = req.body;

  try {
    // Find the saved skill document by skill and user
    const isSkillSaved = await SavedSkill.findOne({
      skill: skillId,
      user: userId,
    });

    if (!isSkillSaved) {
      return res.status(404).json({
        success: false,
        message: "No saved skill found for this user with that skill.",
      });
    }

    // Delete the saved skill
    await SavedSkill.deleteOne({ _id: isSkillSaved._id });

    return res.status(200).json({
      success: true,
      message: "Skill unsaved successfully.",
    });
  } catch (error) {
    console.error("Saved skill unsave error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = unSaveSkill;
