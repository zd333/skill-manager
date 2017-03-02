const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isInactive: { type: Boolean },
  permissions: {
    type: Array,
    default: []
  },
  streams: [{
    streamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream', required: true },
    streamName: { type: String, required: true },
    skills: [{
      skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
      skillName: { type: String, required: true },
      value: { type: Number, required: true, min: 0, max: 4 },
      postedAt: { type: Date, default: Date.now, required: true, index: true },
      approvement: {
        postedAt: { type: Date, default: Date.now, required: true },
        approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        approverName: { type: String, required: true }
      }
    }]
  }]
});
const User = mongoose.model('User', userSchema);

module.exports = User;
