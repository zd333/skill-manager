const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const streamSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

const Stream = mongoose.model('Stream', streamSchema);

module.exports = Stream;
