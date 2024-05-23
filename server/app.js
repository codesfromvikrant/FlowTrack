const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const tagsRouter = require('./routes/tagsRoutes');
const documentsRouter = require('./routes/documentRoutes');
const workspaceRouter = require('./routes/workspaceRoutes');
const projectRouter = require('./routes/projectRoutes');
const tasksRouter = require('./routes/tasksRoutes');
const todoRouter = require('./routes/todoRoutes');
const globalErrorHandler = require('./controllers/errorController');

app.use(express.json());

app.use(cors());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tags', tagsRouter);
app.use('/api/v1/documents', documentsRouter);
app.use('/api/v1/workspaces', workspaceRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/tasks', tasksRouter);
app.use('/api/v1/todos', todoRouter);

// Custom Error Handler
app.use(globalErrorHandler);

module.exports = app;