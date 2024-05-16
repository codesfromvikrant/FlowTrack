const Task = require('../models/taskModel');
const Tasksgroup = require('../models/tasksgroupModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// Tasks Group
exports.createTasksGroup = catchAsync(async (req, res, next) => {
  const { name, projectId } = req.body;
  const tasksGroup = await Tasksgroup.create({ name, projectId });
  res.status(201).json({
    status: 'success',
    data: {
      tasksGroup
    }
  });
});

exports.getAllTasksGroup = catchAsync(async (req, res, next) => {
  const { projectId } = req.query;
  const tasksGroup = await Tasksgroup.find({ projectId });
  res.status(200).json({
    status: 'success',
    results: tasksGroup.length,
    data: {
      tasksGroup
    }
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      task
    }
  });
});

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const { projectId } = req.query;
  const tasks = await Task.find({ projectId });
  res.status(200).json({
    status: 'success',
    results: tasks.length,
    data: {
      tasks
    }
  });
});
