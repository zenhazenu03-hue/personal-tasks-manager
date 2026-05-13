const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter);

// Database Connection Placeholder
// Replace 'mongodb://localhost:27017/flowDesk' with your actual connection string
const mongoURI = 'mongodb://localhost:27017/flowDesk';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  console.log('Running without DB connection for layout testing purposes.');
});

// Basic Route
app.get('/', (req, res) => {
  res.send('flowDesk API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
