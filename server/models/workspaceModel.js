const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a name for the workspace'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the workspace'],
  },
  bgCover: String,
  bgColor: String,
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

const Workspace = mongoose.model('Workspace', workspaceSchema);
module.exports = Workspace;