const { ref } = require("joi");
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    
    description : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
        enum : ["Programming", "Music", "Art", "Language", "Fitness", "Cooking", "Other"],
        default : "Other"
    },
    experienceLevel : {
        type : String,
        enum : ['Beginner', 'Intermediate', 'Expert'],
        default: 'Beginner',
    },
    availableTimes : {
        type : [String], 
        required : true,
    },
    mode : {
        type : String,
        enum : ['online', 'offline'],
        default : 'online'
    },
    location : {
        type : String,
        default : ''
    },
    thumbnail : {
        type : String,
        default : ''
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },

  },
  { timestamps: true }
);


const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;
