const Task = require('../models/taskModel');
const Tasksgroup = require('../models/tasksgroupModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// Tasks Group
exports.createTasksGroup = catchAsync(async (req, res, next) => {
  const { name, workspaceId } = req.body;
  const tasksGroup = await Tasksgroup.create({ name, workspaceId });
  res.status(201).json({
    status: 'success',
    data: {
      tasksGroup
    }
  });
});

exports.getAllTasksGroup = catchAsync(async (req, res, next) => {
  const { workspaceId } = req.query;
  const tasksGroup = await Tasksgroup.find({ workspaceId });
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

exports.updateTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!task) return next(new AppError('No task found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      task
    }
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) return next(new AppError('No task found with that ID', 404));
  res.status(204).json({
    status: 'success',
    data: null
  });
});