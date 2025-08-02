const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createSkill } = require('../controllers/skill controllers/createSkillController');
const getAllSkills = require('../controllers/skill controllers/getAllSkills');
const getSkillById = require('../controllers/skill controllers/getSkillById');
const updateSkill = require('../controllers/skill controllers/updateSkill');
const deleteSkill = require('../controllers/skill controllers/deleteSkill');
const router = express.Router();

// router.get("/me", authMiddleware, (req,res)=>{
//     res.send("welcome to skills ")
// })

router.post("/create", authMiddleware, createSkill);
router.get("/me", authMiddleware, getAllSkills);
router.get("/:id",  getSkillById);
router.put('/:id', authMiddleware, updateSkill);
router.delete('/:id', authMiddleware, deleteSkill); // Same as above


module.exports = router;