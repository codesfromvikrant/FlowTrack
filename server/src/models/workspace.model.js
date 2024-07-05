const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  role: {
    type: String,
    enum: ['admin', 'member'],
    default: 'member'
  }
}, { timestamps: true });

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
  members: [membersSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true });

const Workspace = mongoose.model('Workspace', workspaceSchema);
module.exports = Workspace;