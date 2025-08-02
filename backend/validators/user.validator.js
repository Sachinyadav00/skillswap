const Joi = require("joi");

// const userSchmea = Joi.object({
//   username: Joi.string().alphanum().min(3).max(30).required().messages({
//     "string.base": "Username must be a string",
//     "string.empty": "Username cannot be empty",
//     "string.min": "Username must be at least 3 characters",
//     "string.max": "Username cannot exceed 30 characters",
//     "string.alphanum": "Username must only contain alphanumeric characters",
//     "any.required": "Username is required",
//   }),
//   email: Joi.string().email().required().messages({
//     "string.base": "Email must be a string",
//     "string.empty": "Email cannot be empty",
//     "string.email": "Please provide a valid email address",
//     "any.required": "Email is required",
//   }),
//   password: Joi.string().min(4).required().messages({
//     "string.base": "Password must be a string",
//     "string.empty": "Password cannot be empty",
//     "string.min": "Password must be at least 4 characters",
//     "any.required": "Password is required",
//   }),
//   role: Joi.string()
//     .valid("learner", "trainer", "admin", "user")
//     .default("user")
//     .messages({
//       "string.base": "Role must be a string",
//       "any.only": "Invalid role provided",
//       "any.required": "Role is required",
//     }),

//   skills: Joi.array()
//     .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
//     .messages({
//       "array.base": "Skills must be an array",
//       "string.pattern.base": "Invalid Skill ID format",
//     }),

//   isOnline: Joi.boolean().default(false).messages({
//     "boolean.base": "IsOnline must be a boolean value",
//   }),
// });

const registerValidator = (req, res, next) => {
  const schema = new Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.base": "Username must be a string",
      "string.empty": "Username cannot be empty",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username cannot exceed 30 characters",
      "string.alphanum": "Username must only contain alphanumeric characters",
      "any.required": "Username is required",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(4).required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 4 characters",
      "any.required": "Password is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.error("Validation Failed :", error.details[0].message);
    return res.status(400).json({
      message: "Bad Request",
      success: false,
      error,
    });
  }
  next();
};

const loginValidator = (req, res, next) => {
  const schema = new Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(4).required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 4 characters",
      "any.required": "Password is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.error("Validation Failed :", error.details[0].message);
    return res.status(400).json({
      message: "Bad Request",
      success: false,
      error,
    });
  }
  next();
};

module.exports = {
  loginValidator,
  registerValidator,
};
