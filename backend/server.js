const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const { errorHandler } = require('./middleware/errorMiddleware');

// Routes
const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');

app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRouter);

// Error Handler Middleware
app.use(errorHandler);

// Basic Route
app.get('/', (req, res) => {
  res.send('flowDesk API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
