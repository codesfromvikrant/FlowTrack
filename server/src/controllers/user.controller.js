const User = require("../models/user.models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const ApiResponse = require("../utils/ApiResponse");
const Email = require("../utils/sendEmail");

const createToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    sameSite: "None",
    httpOnly: true,
  };
  res.cookie("jwt_token", token, cookieOptions);
  // Remove password from output
  user.password = undefined;
  user.passwordConfirm = undefined;
  new ApiResponse(statusCode, { token }, "success").send(res);
};

function containsSpecialCharOrSpace(text) {
  const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return regex.test(text) || text.includes(" ");
}

exports.uniqueUsername = catchAsync(async (req, res, next) => {
  const { searchterm } = req.params;
  // Validation: Check for special characters or spaces in the username
  if (containsSpecialCharOrSpace(searchterm)) {
    res.status(200).json({
      status: "fail",
      message: "Username must not contain special characters or spaces!",
    });
  }
  const uniqueUsername = await User.findOne({ username: searchterm });
  if (uniqueUsername) {
    new ApiResponse(200, uniqueUsername, "Username already exists!").send(res);
  }
  new ApiResponse(200, uniqueUsername, "Username is unique!").send(res);
});

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  if (containsSpecialCharOrSpace(username)) {
    return next(new AppError("Please provide a valid username", 400));
  }
  const uniqueUsername = await User.findOne({ username });
  if (uniqueUsername) {
    return next(new AppError("Username already exists", 400));
  }

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });

  createToken(newUser, 201, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    next(new AppError("Incorrect email or password", 401));
  }
  createToken(user, 200, res);
});

exports.signout = (req, res) => {
  res.clearCookie("jwt");
  new ApiResponse(200, null, "success").send(res);
};

// Middleware to protect routes
exports.authorizeToken = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.getUserByUsername = catchAsync(async (req, res, next) => {
  const { searchterm } = req.params;
  const user = await User.find({ username: new RegExp(searchterm, "i") }).limit(
    10
  );
  if (!user) return next(new AppError("No user found with that username", 404));
  new ApiResponse(200, user, "success").send(res);
});

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  new ApiResponse(200, currentUser, "You are authenticated!").send(res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("There is no user with that email address", 404));
  }
  const resetToken = User.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${process.env.CLIENT_URL}/auth/reset_password?token=${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    new Email(email).send(message, "Your password reset token (valid for 10 min)");
    new ApiResponse(200, null, "Token sent to email!").send(res);
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.query;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  createToken(user, 200, res);
});
