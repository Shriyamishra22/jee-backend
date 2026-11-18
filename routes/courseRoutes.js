import express from 'express';
import Course from '../models/Course.js';
import User from '../models/User.js';

const router = express.Router();
// @route   GET /api/courses
// @desc    Get all courses with optional category & search filter
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All Courses') {
      query.category = category;
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    const courses = await Course.find(query).sort({ courseId: 1 });
    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/courses/enroll
// @desc    Enroll student into a course
router.post('/enroll', async (req, res) => {
  try {
    const { email, courseId, paymentMode, paymentId, amount } = req.body;
    if (!email || !courseId) {
      return res.status(400).json({ success: false, message: 'Email and courseId are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Student account not found' });
    }

    const numericCourseId = Number(courseId);
    const alreadyEnrolled = user.enrolledCourses.some(c => c.courseId === numericCourseId);
    if (!alreadyEnrolled) {
      user.enrolledCourses.push({
        courseId: numericCourseId,
        enrolledAt: new Date(),
        paymentMode: paymentMode || 'online',
        paymentId: paymentId || ('PAY-' + Date.now()),
        amount: Number(amount) || 0
      });
      await user.save();
    }

    const course = await Course.findOne({ courseId: numericCourseId });
    res.json({
      success: true,
      message: 'Course enrolled successfully!',
      enrolledCourses: user.enrolledCourses,
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// @route   GET /api/courses/my-courses/:email
// @desc    Get all enrolled courses for student
router.get('/my-courses/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const courseIds = user.enrolledCourses.map(c => c.courseId);
    const courses = await Course.find({ courseId: { $in: courseIds } });

    res.json({
      success: true,
      data: courses,
      user: {
        fullName: user.fullName,
        studentId: user.studentId,
        email: user.email,
        phone: user.phone,
        enrolledCourses: user.enrolledCourses
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/courses/:id
// @desc    Get single course by courseId (e.g. 1, 2) or Mongo _id
router.get('/:id', async (req, res) => {
  try {
    const param = req.params.id;
    let course;

    // Check if numeric ID (courseId)
    if (!isNaN(param)) {
      course = await Course.findOne({ courseId: Number(param) });
    } else {
      course = await Course.findById(param);
    }

    if (!course) {
      course = await Course.findOne({ courseId: 1 });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
