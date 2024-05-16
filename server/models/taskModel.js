const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the project'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the project'],
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  tasksgroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasksgroup'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});
module.exports = mongoose.model('Task', taskSchema)