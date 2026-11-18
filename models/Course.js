import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  unit: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, default: '' }
}, { _id: false });

const faqSchema = new mongoose.Schema({
  q: { type: String, required: true },
  a: { type: String, required: true }
}, { _id: false });

const courseSchema = new mongoose.Schema({
  courseId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, default: '📚' },
  image: { type: String, required: true },
  cardImage: { type: String, default: '' },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: String, default: '50% OFF' },
  description: { type: String, required: true },
  lessons: { type: String, default: '' },
  lectures: { type: String, default: '' },
  students: { type: String, default: '1K+ Students' },
  rating: { type: String, default: '4.8' },
  validity: { type: String, default: '7 Months' },
  files: { type: String, default: '' },
  features: [{ type: String }],
  about: { type: String, default: '' },
  curriculum: [moduleSchema],
  faqs: [faqSchema]
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);

