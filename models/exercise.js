const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  _id: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  date: { type: Number }  //unix dates
});

module.exports = mongoose.model('Exercise', exerciseSchema);