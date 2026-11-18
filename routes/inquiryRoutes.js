import express from 'express';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// @route   POST /api/inquiries
// @desc    Submit new student contact / inquiry form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, courseInterest } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and Phone number are required'
      });
    }

    const inquiry = await Inquiry.create({
      name,
      email: email || '',
      phone,
      message: message || 'Student requested a callback',
      courseInterest: courseInterest || 'General Inquiry'
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! Counselor will call you soon.',
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/inquiries
// @desc    Get all inquiries (for administration)
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

