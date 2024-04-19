const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String,
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  pinned: {
    type: Boolean,
    default: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now
  }
});

const Document = mongoose.model('Note', documentSchema);
module.exports = Document;