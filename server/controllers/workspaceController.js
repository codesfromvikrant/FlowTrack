const Workspace = require("../models/workspaceModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllWorkspaces = catchAsync(async (req, res, next) => {
  const workspaces = await Workspace.find();
  res.status(200).json({
    status: "success",
    results: workspaces.length,
    data: {
      workspaces
    }
  });
});

exports.createWorkspace = catchAsync(async (req, res, next) => {
  const workspace = await Workspace.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      workspace
    }
  });
});

exports.deleteWorkspace = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const workspace = await Workspace.findByIdAndDelete(id);
  if (!workspace) return next(new AppError('No workspace found with that ID', 404));
  res.status(204).json({
    status: 'success',
    data: null
  });
})

exports.updateWorkspace = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const workspace = await Workspace.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!workspace) return next(new AppError('No workspace found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      workspace
    }
  });
});