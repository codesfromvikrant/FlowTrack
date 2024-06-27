const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the tag'],
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;