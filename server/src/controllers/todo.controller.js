const Todo = require('../models/todo.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createTodo = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  req.body.createdBy = _id;
  const todo = await Todo.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      todo
    }
  });
})

exports.getAllTodo = catchAsync(async (req, res, next) => {
  const { taskId } = req.query;
  const todos = await Todo.find({ taskId });
  res.status(200).json({
    status: 'success',
    results: todos.length,
    data: {
      todos
    }
  });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })
  if (!todo) return next(new AppError('No todo found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      todo
    }
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);
  if (!todo) return next(new AppError('No todo found with that ID', 404));
  res.status(204).json({
    status: 'success',
    data: null
  });
})