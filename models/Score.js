const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String },
  score: { type: Number, required: true },
  time: { type: Number, required: true }, // segundos
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', ScoreSchema);
