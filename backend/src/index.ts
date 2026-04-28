import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['https://msgdrop.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

import passport from 'passport';
import './lib/passport';
app.use(passport.initialize());

import aiRoutes from './routes/ai';
import dbRoutes from './routes/db';

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api', aiRoutes);
app.use('/api', dbRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
