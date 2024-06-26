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
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  createdBy: {
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
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;