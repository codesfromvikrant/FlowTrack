const User = require('../models/userModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const createToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  user.passwordConfirm = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
}

function containsSpecialCharOrSpace(text) {
  const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return regex.test(text) || text.includes(' ');
}

exports.uniqueUsername = catchAsync(async (req, res, next) => {
  const { searchterm } = req.params;

  // Validation: Check for special characters or spaces in the username
  if (containsSpecialCharOrSpace(searchterm)) {
    res.status(200).json({
      status: 'fail',
      message: 'Username must not contain special characters or spaces!'
    })
  }
  const uniqueUsername = await User.findOne({ username: searchterm });
  if (uniqueUsername) {
    res.status(200).json({
      status: 'fail',
      message: 'Username already exists!'
    })
  }
  res.status(200).json({
    status: 'success',
    message: 'Username is unique!'
  })
})

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  if (containsSpecialCharOrSpace(username)) {
    return next(new AppError('Please provide a valid username', 400));
  }
  const uniqueUsername = await User.findOne({ username });
  if (uniqueUsername) {
    return next(new AppError('Username already exists', 400));
  }

  const newUser = await User.create({ username, email, password, passwordConfirm });

  createToken(newUser, 201, res);
})

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError('Please provide email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    next(new AppError('Incorrect email or password', 401));
  }
  createToken(user, 200, res);
})

exports.signout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({
    status: 'success'
  });
}

// Middleware to protect routes
exports.authorizeToken = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist', 401));
  }
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(new AppError('User recently changed password! Please log in again', 401));
  // }
  req.user = currentUser;
  next();
})

exports.getUserByUsername = catchAsync(async (req, res, next) => {
  const { searchterm } = req.params;
  const user = await User.find({ username: new RegExp(searchterm, 'i') }).limit(10);
  if (!user) return next(new AppError('No user found with that username', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
})

