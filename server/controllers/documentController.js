const Document = require('../models/documentModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllDocuments = catchAsync(async (req, res, next) => {
  const tags = req.query.tags;

  let documents;
  if (tags) {
    documents = await Document.find({ tags: { $in: tags } });
  } else {
    documents = await Document.find();
  }

  res.status(200).json({
    status: 'success',
    results: documents.length,
    data: {
      documents
    }
  });
});

exports.getDocument = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError('Please provide an id', 400));

  const document = await Document.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      document
    }
  });
});

exports.createDocument = catchAsync(async (req, res, next) => {
  const document = await Document.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      document
    }
  });
});

exports.deleteDocument = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const document = await Document.findByIdAndDelete(id);
  if (!document) return next(new AppError('No note found with that ID', 404));
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateDocument = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const document = await Document.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!document) return next(new AppError('No note found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      document
    }
  });
});

exports.updateDocumentTags = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { tagId } = req.body;
  if (!tagId) return next(new AppError('Please provide tags', 400));

  const document = await Document.findById(id);
  if (!document) return next(new AppError('No note found with that ID', 404));

  let tags = document.tags
  if (tags.includes(tagId)) {
    tags = tags.map(tag => tag.toString()).filter(tag => tag !== tagId);
    console.log(tagId, tags)
  } else {
    tags.push(tagId);
  }
  document.tags = tags;
  await document.save();

  res.status(200).json({
    status: 'success',
    data: {
      document
    }
  });

});