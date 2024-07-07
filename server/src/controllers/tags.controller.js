const Tag = require('../models/tags.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/ApiResponse');

exports.getAllTags = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const tags = await Tag.find({ userID: _id })
  new ApiResponse(200, tags, 'successfully tags fetched').send(res);
});

exports.createTag = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { _id } = req.user;
  let tag = await Tag.findOne({ name });
  if (tag) {
    res.status(400).json({
      status: 'fail',
      message: 'Tag already exists'
    });
  }
  tag = await Tag.create({
    name, userID: _id
  });
  new ApiResponse(201, tag, 'successfully tag created').send(res);
});

exports.deleteTag = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const tag = await Tag.findByIdAndDelete(id);
  if (!tag) return next(new AppError('No tag found with that ID', 404));
  new ApiResponse(204, null, 'successfully tag deleted').send(res);
});
