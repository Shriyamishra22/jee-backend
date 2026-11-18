import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import courseRoutes from './routes/courseRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware

app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API Routes
app.use('/api/courses', courseRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);


// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'JEE Classes Meerut Backend API is running smoothly',
    timestamp: new Date().toISOString()
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Courses API: http://localhost:${PORT}/api/courses`);
  console.log(`✉️ Inquiries API: http://localhost:${PORT}/api/inquiries`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`⚙️ Admin API: http://localhost:${PORT}/api/admin`);
});
