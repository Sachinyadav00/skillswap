const Skill = require("../../models/skills.model");
const { createSkillSchema } = require("../../validators/skill.validator");

const createSkill = async (req, res) => {
  //Ownership : user must be authenticated

  const userId = req.user._id;
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized : No user found",
    });
  }

   
  try {
    // validate inputs using JOI
    const { error, value } = createSkillSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // create skill

    const newSkill = await Skill.create({
      ...value,
      createdBy: userId,
    });

    res.status(201).json({
      success: true,
      message: "Skill Created Successfully",
      skill: newSkill,
    });
  } catch (err) {
    console.error("Error createing skill:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {createSkill};
