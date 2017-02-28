const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  name: { type: String, required: true, unique: true },
  streamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream', required: true }
});
const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
