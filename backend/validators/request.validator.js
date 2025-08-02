const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const isValidObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const sendRequestSchema = Joi.object({
  reciever: Joi.string().custom(isValidObjectId).required().messages({
    "any.required": "Reciever is required ",
    "any.invalid": "Invalid reciever id",
  }),
  skill: Joi.string().custom(isValidObjectId).required().messages({
    "any.required": "Skill is required ",
    "any.invalid": "Invalid skill id",
  }),
  message: Joi.string().allow("").max(300).messages({
    "string.max ": "messages must be under 300",
  }),

  communicationMode: Joi.string()
    .valid("chat", "call", "meet")
    .default("chat")
    .messages({
      "any.only": "Communication mode must be one of chat or meet",
    }),
});

module.exports = { sendRequestSchema };
