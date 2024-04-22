const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      projects
    }
  });
})

exports.getProject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) return next(new AppError('No project found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      project
    }
  });
})

exports.createProject = catchAsync(async (req, res, next) => {
  const project = await Project.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      project
    }
  });
})

exports.deleteProject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findByIdAndDelete(id);
  if (!project) return next(new AppError('No project found with that ID', 404));
  res.status(204).json({
    status: 'success',
    data: null
  });
})