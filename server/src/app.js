const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// Middlewares
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())
app.use(express.static('../public'))

// Routes
const userRouter = require('./routes/user.routes');
const tagsRouter = require('./routes/tags.routes');
const documentsRouter = require('./routes/document.routes');
const workspaceRouter = require('./routes/workspace.routes');
const projectRouter = require('./routes/project.routes');
const tasksRouter = require('./routes/tasks.routes');
const todoRouter = require('./routes/todo.routes');
const invitationRouter = require('./routes/invitation.routes');
const globalErrorHandler = require('./controllers/error.controller');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tags', tagsRouter);
app.use('/api/v1/documents', documentsRouter);
app.use('/api/v1/workspaces', workspaceRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/tasks', tasksRouter);
app.use('/api/v1/todos', todoRouter);
app.use('/api/v1/invitation', invitationRouter);

// Custom Error Handler
app.use(globalErrorHandler);

module.exports = app;