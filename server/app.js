const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const tagsRouter = require('./routes/tagsRoutes');
const documentsRouter = require('./routes/documentRoutes');
const workspaceRouter = require('./routes/workspaceRoutes');

app.use(express.json());

app.use(cors());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tags', tagsRouter);
app.use('/api/v1/documents', documentsRouter);
app.use('/api/v1/workspaces', workspaceRouter);


module.exports = app;