const mongoose = require("mongoose")
const Schema = mongoose.Schema
var Weight = new Schema({
  value: Number,
  date: {type:String, unique:true}
})
module.exports = mongoose.model("Weight", Weight)
