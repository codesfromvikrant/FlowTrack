const mongoose = require('mongoose');

const tasksgroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the project'],
  },
});

const Tasksgroup = mongoose.model('Tasksgroup', tasksgroupSchema);
module.exports = Tasksgroup;