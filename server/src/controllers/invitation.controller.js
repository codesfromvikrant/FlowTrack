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

  const token = jwt.sign({ invitationId, workspaceId, redirectUrl: `${baseUrl}/user/workspaces/${workspaceId}` }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  const invitationAcceptLink =
    `${baseUrl}/invitation?token=${token}`;

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
  const { invitationId, redirectUrl } = decoded;

  const invitation = await Invitation.findById(invitationId);
  const { workspaceId, role } = invitation;

  if (!workspaceId) return next(new AppError('No workspace found with that ID', 404));

  if (req.user._id.toString() !== invitation.createdBy.toString()) return next(new AppError('You are not authorized to accept this invitation', 401));

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) return next(new AppError('No workspace found with that ID', 404));
  workspace.members.push({ userId: req.user._id, role });
  await workspace.save();

  if (!invitation) return next(new AppError('No invitation found with that ID', 404));
  invitation.status = "accepted";
  await invitation.save();

  res.status(200).json({
    status: 'success',
    message: 'invitation accepted successfully!',
    data: {
      redirectUrl
    }
  });
})

exports.rejectInvitation = catchAsync(async (req, res, next) => {
  const { token } = req.query;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { invitationId, redirectUrl } = decoded;

  const invitation = await Invitation.findById(invitationId);
  if (!invitation) return next(new AppError('No invitation found with that ID', 404));
  invitation.status = "rejected";
  await invitation.save();

  res.status(200).json({
    status: 'success',
    message: 'invitation rejected successfully!',
    data: {
      redirectUrl
    }
  });
})