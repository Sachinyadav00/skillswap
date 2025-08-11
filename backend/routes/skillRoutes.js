const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createSkill,
} = require("../controllers/skill controllers/createSkillController");
const getSkillById = require("../controllers/skill controllers/getSkillById");
const updateSkill = require("../controllers/skill controllers/updateSkill");
const deleteSkill = require("../controllers/skill controllers/deleteSkill");
const saveSkill = require("../controllers/skill controllers/savedSkill/savedskill");
const getSavedSkill = require("../controllers/skill controllers/savedSkill/getSavedSkill");
const unSaveSkill = require("../controllers/skill controllers/savedSkill/unSave");
const filterSkills = require("../controllers/skill controllers/filterSkills");
const getMySkills = require("../controllers/skill controllers/getMySkills");
const getAllSkills = require("../controllers/skill controllers/getAllSkills");
const router = express.Router();

// router.get("/me", authMiddleware, (req,res)=>{
//     res.send("welcome to skills ")
// })

router.post("/create", authMiddleware, createSkill);
router.get("/Allskills",  getAllSkills);

router.get("/me", authMiddleware, getMySkills);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill); // Same as above

//filter skills
router.get("/b1/filter", filterSkills);

// saved skill routes
router.delete("/b1/unSave/", authMiddleware, unSaveSkill);
router.get("/saved", authMiddleware, getSavedSkill);
router.get("/:id", getSkillById);
router.post("/saved", authMiddleware, saveSkill);

module.exports = router;
