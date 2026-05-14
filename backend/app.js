const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',  require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/', (_req, res) => res.json({ status: 'ok', app: 'FlowDesk API' }));

// ── Error Handler (must be last) ──────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
