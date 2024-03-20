const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const tagsRouter = require('./routes/tagsRoutes');
const notesRoutes = require('./routes/notesRoutes');

app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tags', tagsRouter);
app.use('/api/v1/notes', notesRoutes);

app.use(cors());
module.exports = app;