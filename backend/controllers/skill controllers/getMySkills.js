const Skill = require("../../models/skills.model");

const getMySkills = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized : No user found",
    });
  }

  const skills = await Skill.find({ createdBy : userId });
  console.log(skills);
  
  
  if(!skills || skills.length === 0 ){
    return res.status(401).json({
        success : false,
        message : "No Skill Found"        
    })
  }
  
  res.status(200).json({
    success : true,
    username : req.user.username,
    Skill : skills
  })
};

module.exports = getMySkills;
