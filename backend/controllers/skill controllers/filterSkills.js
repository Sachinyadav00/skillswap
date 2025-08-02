 
const Skill = require('../../models/skills.model')

const filterSkills = async (req, res) => {
  const { category, experienceLevel, mode, location, time, search } = req.query;

  let filter = {};

  if (category) filter.category = category;
  if (experienceLevel) filter.experienceLevel = experienceLevel;
  if (mode) filter.mode = mode;
  if (location) filter.location = location;
  if (time) filter.availableTimes = { $in: [time] };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  try {
    const skills = await Skill.find(filter);
    return res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: `Server error ${error}`,  });
  }
};

module.exports = filterSkills;
