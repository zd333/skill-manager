const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdpSchema = new Schema(
  {
    postedAt: { type: Date, default: Date.now, required: true },
    creatorId: { type: String, required: true },
    creatorName: { type: String, required: true },
    finishesAt: { type: Date, required: true },
    goals: [
      {
        streamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream', required: true },
        streamName: { type: String, required: true },
        skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
        skillName: { type: String, required: true },
        value: { type: Number, required: true, min: 0, max: 4 }
      }
    ]
  });

const Pdp = mongoose.model('Pdp', pdpSchema);

module.exports = Pdp;
