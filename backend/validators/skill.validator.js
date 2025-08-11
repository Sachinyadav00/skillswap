const Joi = require('joi');

const createSkillSchema = Joi.object({
    title : Joi.string().min(3).max(100).required(),
    description : Joi.string().min(10).max(100).required(),
    category : Joi.string().valid("Programming", "Music", "Art", "Language", "Fitness", "Cooking", "Other").required(),
    experienceLevel : Joi.string().valid('Beginner', 'Intermediate', 'Expert').default('Begineer'),
    availableTimes : Joi.array().items(Joi.string()).min(1).required(),
    mode : Joi.string().valid('online', 'offline').default('online'),
    location: Joi.string().allow(''),
    thumbnail : Joi.string().uri().allow(''),

})

module.exports = {createSkillSchema}