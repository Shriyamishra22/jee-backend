import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new student
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, password, qualification, batchType, courseId } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email is already registered. Please login.'
      });
    }

    // Generate unique student ID
    const studentId = 'JEE-' + Math.floor(100000 + Math.random() * 900000);

    const enrolledCourses = courseId ? [{ courseId: Number(courseId) }] : [];

    const user = await User.create({
      studentId,
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password,
      qualification: qualification || 'Diploma Student',
      batchType: batchType || 'Online Live Classes',
      enrolledCourses
    });

    res.status(201).json({
      success: true,
      message: 'Student registered successfully!',
      token: generateToken(user._id),
      user: {
        id: user._id,
        studentId: user.studentId,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        enrolledCourses: user.enrolledCourses
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login student & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.json({
      success: true,
      message: 'Logged in successfully!',
      token: generateToken(user._id),
      user: {
        id: user._id,
        studentId: user.studentId,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        enrolledCourses: user.enrolledCourses
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/auth/profile
// @desc    Get student profile using token
router.get('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token is invalid or expired' });
  }
});

export default router;

