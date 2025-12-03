const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Score', ScoreSchema);
