const mongoose = require('mongoose');

const tasksgroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the project'],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
});

const Tasksgroup = mongoose.model('Tasksgroup', tasksgroupSchema);
module.exports = Tasksgroup;