const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    communicationMode: {
      type: String,
      enum: ["chat", "call", "meet"],
      default: "chat",
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    respondedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
