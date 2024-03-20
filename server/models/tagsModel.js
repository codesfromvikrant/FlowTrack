const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the tag'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category for the tag'],
  },
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;