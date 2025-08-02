const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
    role: {
      type: String,
      enum: ["learner", "trainer", "admin", "user"],
      default: "user",
    },
    skills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
