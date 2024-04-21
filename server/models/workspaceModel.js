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
});

const Workspace = mongoose.model('Workspace', workspaceSchema);
module.exports = Workspace;