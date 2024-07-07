const mongoose = require('mongoose');

const assigneeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

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
  assignees: [assigneeSchema],
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['to_do', 'in_progress', 'on_hold', 'completed'],
    default: 'to_do',
    required: true,
  },
  priority: {
    type: String,
    enum: ['minor', 'major', 'critical'],
    default: 'minor',
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasksgroup'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });
module.exports = mongoose.model('Task', taskSchema)