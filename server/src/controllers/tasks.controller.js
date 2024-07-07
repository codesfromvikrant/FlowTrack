const Task = require('../models/task.model');
const Tasksgroup = require('../models/tasksgroup.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require("../utils/ApiResponse");

// Tasks Group
exports.createTasksGroup = catchAsync(async (req, res, next) => {
  const { name, workspaceId } = req.body;
  const tasksGroup = await Tasksgroup.create({ name, workspaceId });
  new ApiResponse(201, tasksGroup, 'successfully task group created').send(res);
});

exports.getAllTasksGroup = catchAsync(async (req, res, next) => {
  const { workspaceId } = req.query;
  const tasksGroup = await Tasksgroup.find({ workspaceId });
  new ApiResponse(200, tasksGroup, 'successfully task group fetched').send(res);
});

exports.createTask = catchAsync(async (req, res, next) => {
  const task = await Task.create(req.body);
  new ApiResponse(201, task, 'successfully task created').send(res);
});

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const { projectId } = req.query;
  const tasks = await Task.find({ projectId });
  new ApiResponse(200, tasks, 'successfully tasks fetched').send(res);
});

exports.getAllAssigneedTasks = catchAsync(async (req, res, next) => {
  const assigneeId = req.user._id;
  const tasks = await Task.find({ $or: [{ assignees: { $elemMatch: { userId: assigneeId } } }, { createdBy: assigneeId }] });
  new ApiResponse(200, tasks, 'successfully tasks fetched').send(res);
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!task) return next(new AppError('No task found with that ID', 404));
  new ApiResponse(200, task, 'successfully task updated').send(res);
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) return next(new AppError('No task found with that ID', 404));
  new ApiResponse(204, null, 'successfully task deleted').send(res);
});