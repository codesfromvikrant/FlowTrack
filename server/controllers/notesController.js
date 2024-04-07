const Note = require('../models/notesModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllNotes = catchAsync(async (req, res, next) => {
  const notes = await Note.find();
  res.status(200).json({
    status: 'success',
    results: notes.length,
    data: {
      notes
    }
  });
});

exports.getNote = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError('Please provide an id', 400));

  const notes = await Note.findOne({ id });
  res.status(200).json({
    status: 'success',
    data: {
      notes
    }
  });
});

exports.createNote = catchAsync(async (req, res, next) => {
  const note = await Note.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      note
    }
  });
});

exports.deleteNote = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const note = await Note.findByIdAndDelete(id);
  if (!note) return next(new AppError('No note found with that ID', 404));
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateNote = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const note = await Note.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!note) return next(new AppError('No note found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      note
    }
  });
});

exports.updateNoteTags = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { tagId } = req.body;
  if (!tags) return next(new AppError('Please provide tags', 400));

  const note = await Note.findOne({ id });
  if (!note) return next(new AppError('No note found with that ID', 404));

  const tags = note.tags
  if (tags.includes(tagId)) {
    tags = tags.filter(tag => tag !== tagId);
  } else {
    tags.push(tagId);
  }
  note.tags = tags;
  await note.save();

  res.status(200).json({
    status: 'success',
    data: {
      note
    }
  });

});