const SavedSkill = require("../../../models/savedSkill.model");
const Skill = require("../../../models/skills.model");

const saveSkill = async (req, res) => {
  const userId = req.user._id;
  const { skillId } = req.body;

  try {
    // check if skill exist

    const skillExist = await Skill.findById(skillId);
    if (!skillExist) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    const alreadySaved = await SavedSkill.findOne({
      user: userId,
      skill: skillId,
    });

    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: "Skill already saved",
      });
    }

    const saved = new SavedSkill({
      user: userId,
      skill: skillId,
    });

    await saved.save();

    return res.status(200).json({
      success: true,
      message: "Skill saved successfully",
    });
  } catch (error) {
    console.log("Saved skill error : ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = saveSkill;
