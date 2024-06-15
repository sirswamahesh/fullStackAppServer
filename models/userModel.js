const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: [true, "please add name"],
    trim:type,
  },
  email: {
    type: String,
    requried:[true,"please add email"],
    unique:true,
    trim:true,
  },
  password: {
    type: String,
    requried:[true,"please add password"],
    min:6,
    max:64,
  },
  role:{
    type:String,
    default:"user"
  }
},{timestamps:true});


module.exports = mongoose.model("User",userSchema)