const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the workspace'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the workspace'],
  },
  // collaborators: [{
  //   user_id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: true,
  //   },
  //   admin: {
  //     type: Boolean,
  //     required: true,
  //   }
  // }],
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
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