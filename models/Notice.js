import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Exam Alert', 'Live Class', 'Doubt Session', 'Important Notice', 'Holiday'],
    default: 'Important Notice'
  },
  priority: {
    type: String,
    enum: ['High', 'Normal', 'Urgent'],
    default: 'Normal'
  },
  targetBranch: {
    type: String,
    default: 'All Branches'
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Notice = mongoose.model('Notice', noticeSchema);
export default Notice;
