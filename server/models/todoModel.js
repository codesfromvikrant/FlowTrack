const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Todo', todoSchema);