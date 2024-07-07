const Todo = require('../models/todo.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const ApiResponse = require('../utils/ApiResponse');

exports.createTodo = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  req.body.createdBy = _id;
  const todo = await Todo.create(req.body);
  new ApiResponse(201, todo, 'successfully todo created').send(res);
})

exports.getAllTodo = catchAsync(async (req, res, next) => {
  const { taskId } = req.query;
  const todos = await Todo.find({ taskId });
  new ApiResponse(200, todos, 'successfully todos fetched').send(res);
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })
  if (!todo) return next(new AppError('No todo found with that ID', 404));
  new ApiResponse(200, todo, 'successfully todo updated').send(res);
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);
  if (!todo) return next(new AppError('No todo found with that ID', 404));
  new ApiResponse(204, null, 'successfully todo deleted').send(res);
})