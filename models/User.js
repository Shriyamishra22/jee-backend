import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  studentId: {
    type: String,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true
   },
  qualification: { type: String, default: 'Diploma Student' },
  batchType: { type: String, default: 'Online Live Classes' },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  enrolledCourses: [{
    courseId: { type: Number },
    enrolledAt: { type: Date, default: Date.now },
    paymentMode: { type: String, default: 'online' },
    paymentId: { type: String, default: '' },
    amount: { type: Number, default: 0 }
  }]
}, { timestamps: true });
// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
export default mongoose.model('User', userSchema);

