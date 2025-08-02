const mongoose = require("mongoose");

const savedSkillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedSkill", savedSkillSchema);
