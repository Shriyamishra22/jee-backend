import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  courseInterest: { type: String, default: 'General Inquiry' },
  status: { type: String, enum: ['new', 'contacted', 'enrolled', 'closed'], default: 'new' }
}, { timestamps: true });

export default mongoose.model('Inquiry', inquirySchema);

