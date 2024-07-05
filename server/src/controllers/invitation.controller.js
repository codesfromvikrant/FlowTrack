const Invitation = require('../models/invitation.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const Email = require('../utils/sendEmail');

exports.sendInvitation = catchAsync(async (req, res, next) => {
  const { email, role, workspaceId } = req.body;
  const invitation = await Invitation.create({ email, role, workspaceId, createdBy: req.user._id });

  const invitationId = invitation._id;
  const baseUrl = process.env.CLIENT_URL;

  const token = jwt.sign({ invitationId, workspaceId, redirectUrl: `${baseUrl}/user/workspace/${workspaceId}` }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  const invitationAcceptLink =
    `${baseUrl}/user/invitation?token=${token}`;

  const template = `<div><h4>You are invited to join Flowtrack Workspace by a user.</h4><a href="${invitationAcceptLink}">Accept Invitation</a></div>`

  await new Email(email).send(template, 'Invitation to join Flowtrack Workspace');

  res.status(200).json({
    status: 'success',
    message: 'invitation link sent successfully!',
    data: {
      invitationAcceptLink
    }
  });
})

exports.acceptInvitation = catchAsync(async (req, res, next) => {
  const { token } = req.query;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { invitationId, workspaceId, redirectUrl } = decoded;
  const invitation = await Invitation.findById(invitationId);
  if (!invitation) return next(new AppError('No invitation found with that ID', 404));
  invitation.status = "accepted";
  await invitation.save();
  res.redirect(redirectUrl);
})