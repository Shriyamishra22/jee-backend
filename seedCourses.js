import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';

dotenv.config();

const initialCourses = [
  {
    courseId: 1,
    title: "B.Tech 3rd Semester Computer Science Engineering (AKTU)",
    shortTitle: "AKTU B.Tech CSE 3rd Sem",
    category: "CS/IT",
    branch: "Computer Science",
    batchType: "Engineering",
    semester: "3rd Semester",
    year: "2nd Year",
    icon: "💻",
    image: "/images/b1.webp",
    cardImage: "/images/b1.webp",
    price: 799,
    originalPrice: 2500,
    discount: "68% OFF",
    tags: ["FREE CONTENT", "VIDEOS", "FILES"],
    description: "Complete syllabus coverage for AKTU B.Tech CSE 3rd Semester with Data Structures, Discrete Structures, and Computer Organization.",
    lessons: "45 Lessons",
    lectures: "120+ Video Lectures",
    students: "2.8K+ Students",
    rating: "4.9",
    validity: "7 Months",
    files: "65+ Files",
    features: [
      "Data Structures & Algorithms (C/C++)",
      "Discrete Structures & Theory of Logic",
      "Computer Organization & Architecture",
      "Previous 10 Years AKTU Solved Papers"
    ]
  },
  {
    courseId: 2,
    title: "B.Tech 3rd Semester Civil Engineering (AKTU)",
    shortTitle: "AKTU B.Tech Civil 3rd Sem",
    category: "Civil",
    branch: "Civil Engineering",
    batchType: "Engineering",
    semester: "3rd Semester",
    year: "2nd Year",
    icon: "🏗️",
    image: "/images/b2.webp",
    cardImage: "/images/b2.webp",
    price: 799,
    originalPrice: 2500,
    discount: "68% OFF",
    tags: ["FREE CONTENT", "VIDEOS", "FILES"],
    description: "Master AKTU B.Tech Civil 3rd Semester subjects including Building Materials, Fluid Mechanics, and Surveying.",
    lessons: "40 Lessons",
    lectures: "115+ Video Lectures",
    students: "2.1K+ Students",
    rating: "4.8",
    validity: "7 Months",
    files: "58+ Files",
    features: [
      "Building Materials & Construction",
      "Fluid Mechanics & Hydraulics",
      "Surveying & Geomatics",
      "Numerical Problem Solving & Formula Sheets"
    ]
  },
  {
    courseId: 3,
    title: "B.Tech 5th Semester Mechanical Engineering (AKTU)",
    shortTitle: "AKTU B.Tech Mechanical 5th Sem",
    category: "Mechanical",
    branch: "Mechanical Engineering",
    batchType: "Engineering",
    semester: "5th Semester",
    year: "3rd Year",
    icon: "⚙️",
    image: "/images/b3.webp",
    cardImage: "/images/b3.webp",
    price: 799,
    originalPrice: 2500,
    discount: "68% OFF",
    tags: ["FREE CONTENT", "VIDEOS", "FILES"],
    description: "In-depth course for AKTU B.Tech Mechanical 5th Semester: Heat & Mass Transfer, Machine Design, and Manufacturing Technology.",
    lessons: "42 Lessons",
    lectures: "118+ Video Lectures",
    students: "2.4K+ Students",
    rating: "4.9",
    validity: "7 Months",
    files: "62+ Files",
    features: [
      "Heat & Mass Transfer (HMT)",
      "Design of Machine Elements (DME)",
      "Manufacturing Science & Technology",
      "Derivations & AKTU Exam Strategy"
    ]
  },
  {
    courseId: 4,
    title: "B.Tech Engineering Mathematics - II (AKTU)",
    shortTitle: "AKTU Engg. Math-II B.Tech",
    category: "Mathematics",
    branch: "All Branches",
    batchType: "Foundation",
    semester: "2nd Semester",
    year: "1st Year",
    icon: "📐",
    image: "/images/b4.webp",
    cardImage: "/images/b4.webp",
    price: 699,
    originalPrice: 2200,
    discount: "68% OFF",
    tags: ["FREE CONTENT", "VIDEOS", "FILES"],
    description: "AKTU B.Tech 1st Year Engineering Mathematics-II: Ordinary & Partial Differential Equations, Laplace Transforms, and Complex Variables.",
    lessons: "38 Lessons",
    lectures: "105+ Video Lectures",
    students: "3.5K+ Students",
    rating: "4.9",
    validity: "7 Months",
    files: "50+ Files",
    features: [
      "Differential Equations of Higher Order",
      "Laplace & Inverse Laplace Transforms",
      "Partial Differential Equations (PDE)",
      "Complex Analysis & Mapping"
    ]
  },
  {
    courseId: 5,
    title: "B.Tech 6th Semester (3rd Year) Mechanical Engineering (AKTU)",
    shortTitle: "AKTU B.Tech Mechanical 6th Sem",
    category: "Mechanical",
    branch: "Mechanical Engineering",
    batchType: "Engineering",
    semester: "6th Semester",
    year: "3rd Year",
    icon: "⚙️",
    image: "/images/b5.webp",
    cardImage: "/images/b5.webp",
    price: 849,
    originalPrice: 2700,
    discount: "69% OFF",
    tags: ["FREE CONTENT", "VIDEOS", "FILES"],
    description: "AKTU B.Tech 6th Semester Mechanical: Refrigeration & Air Conditioning, Machine Design II, and Automobile Engineering.",
    lessons: "44 Lessons",
    lectures: "125+ Video Lectures",
    students: "2.6K+ Students",
    rating: "4.9",
    validity: "7 Months",
    files: "68+ Files",
    features: [
      "Refrigeration & Air Conditioning (RAC)",
      "Machine Design-II (Gears, Bearings, Clutches)",
      "Automobile Engineering & Power Plants",
      "Complete AKTU PYQ Solutions & Notes"
    ]
  },
  {
    courseId: 6,
    title: "B.Tech 4th Semester Civil Engineering (AKTU)",
    shortTitle: "AKTU B.Tech Civil 4th Sem",
    category: "Civil",
    branch: "Civil Engineering",
    batchType: "Engineering",
    semester: "4th Semester",
    year: "2nd Year",
    icon: "🌉",
    image: "/images/b6.webp",
    cardImage: "/images/b6.webp",
    price: 799,
    originalPrice: 2500,
    discount: "68% OFF",
    tags: ["FREE CONTENT", "VIDEOS", "FILES"],
    description: "AKTU B.Tech Civil 4th Semester: Structural Analysis, Hydraulic Engineering, and Concrete Technology.",
    lessons: "40 Lessons",
    lectures: "112+ Video Lectures",
    students: "1.9K+ Students",
    rating: "4.8",
    validity: "7 Months",
    files: "56+ Files",
    features: [
      "Structural Analysis I (Determinate Structures)",
      "Hydraulic Engineering & Open Channel Flow",
      "Materials, Testing & Concrete Construction",
      "Formula Cheat Sheets & AKTU Question Bank"
    ]
  },
  {
    courseId: 7,
    title: "B.Tech 3rd Semester Electrical Engineering (EEE Branch - AKTU)",
    shortTitle: "AKTU B.Tech Electrical EEE 3rd Sem",
    category: "Electrical",
    branch: "Electrical & Electronics (EEE)",
    batchType: "Engineering",
    semester: "3rd Semester",
    year: "2nd Year",
    icon: "⚡",
    image: "/images/cce.webp",
    cardImage: "/images/cce.webp",
    price: 799,
    originalPrice: 2500,
    discount: "68% OFF",
    tags: ["FREE CONTENT", "VIDEOS", "FILES"],
    description: "AKTU B.Tech EEE 3rd Semester: Basic System Analysis, Electromagnetic Field Theory, and Electrical Machines.",
    lessons: "42 Lessons",
    lectures: "114+ Video Lectures",
    students: "2.3K+ Students",
    rating: "4.8",
    validity: "7 Months",
    files: "60+ Files",
    features: [
      "Electromagnetic Field Theory (EMFT)",
      "Electrical Circuit Analysis & Network Theorems",
      "Electrical Machines - I (Transformers & DC Machines)",
      "Derivations & Numerical Problem Workshops"
    ]
  },
  {
    courseId: 8,
    title: "B.Tech 3rd Semester Mechanical Engineering (AKTU)",
    shortTitle: "AKTU B.Tech Mechanical 3rd Sem",
    category: "Mechanical",
    branch: "Mechanical Engineering",
    batchType: "Engineering",
    semester: "3rd Semester",
    year: "2nd Year",
    icon: "⚙️",
    image: "/images/ccm1.webp",
    cardImage: "/images/ccm1.webp",
    price: 799,
    originalPrice: 2500,
    discount: "68% OFF",
    tags: ["FREE CONTENT", "VIDEOS", "FILES"],
    description: "AKTU B.Tech Mechanical 3rd Semester: Thermodynamics, Mechanics of Solids (MOS), and Material Engineering.",
    lessons: "46 Lessons",
    lectures: "128+ Video Lectures",
    students: "2.7K+ Students",
    rating: "4.9",
    validity: "7 Months",
    files: "64+ Files",
    features: [
      "Mechanics of Solids (Strength of Materials)",
      "Engineering Thermodynamics & Gas Laws",
      "Material Science & Metallurgy",
      "Step-by-step Mohr's Circle & SFD/BMD Problems"
    ]
  },
  {
    courseId: 9,
    title: "B.Tech 4th Semester Mechanical Engineering (AKTU)",
    shortTitle: "AKTU B.Tech Mechanical 4th Sem",
    category: "Mechanical",
    branch: "Mechanical Engineering",
    batchType: "Engineering",
    semester: "4th Semester",
    year: "2nd Year",
    icon: "⚙️",
    image: "/images/ccm3.webp",
    cardImage: "/images/ccm3.webp",
    price: 799,
    originalPrice: 2500,
    discount: "68% OFF",
    tags: ["FREE CONTENT", "VIDEOS", "FILES"],
    description: "AKTU B.Tech Mechanical 4th Semester: Applied Thermodynamics, Fluid Mechanics, and Manufacturing Processes.",
    lessons: "40 Lessons",
    lectures: "115+ Video Lectures",
    students: "2.2K+ Students",
    rating: "4.9",
    validity: "7 Months",
    files: "58+ Files",
    features: [
      "Applied Thermodynamics (Steam Boilers & Turbines)",
      "Fluid Mechanics & Bernoulli's Applications",
      "Manufacturing Technology & Casting",
      "Full AKTU Exam Pattern Solved Papers"
    ]
  },
  {
    courseId: 10,
    title: "B.Tech 1st Year Engineering Mathematics - I (AKTU)",
    shortTitle: "AKTU Engg. Math-I B.Tech 1st Year",
    category: "Mathematics",
    branch: "All Branches",
    batchType: "Foundation",
    semester: "1st Semester",
    year: "1st Year",
    icon: "📐",
    image: "/images/ccmmath1.webp",
    cardImage: "/images/ccmmath1.webp",
    price: 699,
    originalPrice: 2200,
    discount: "68% OFF",
    tags: ["FREE CONTENT", "VIDEOS", "FILES"],
    description: "AKTU B.Tech 1st Semester Engineering Mathematics-I: Matrices, Differential Calculus, and Vector Calculus.",
    lessons: "40 Lessons",
    lectures: "110+ Video Lectures",
    students: "4.2K+ Students",
    rating: "4.9",
    validity: "7 Months",
    files: "60+ Files",
    features: [
      "Matrices, Eigenvalues & Cayley-Hamilton Theorem",
      "Successive Differentiation & Leibniz Theorem",
      "Partial Differentiation & Euler's Theorem",
      "Vector Calculus, Gauss & Stokes Theorems"
    ]
  },
  {
    courseId: 11,
    title: "B.Tech Engineering Mathematics - III (AKTU)",
    shortTitle: "AKTU B.Tech Engg. Math-III",
    category: "Mathematics",
    branch: "All Branches",
    batchType: "Foundation",
    semester: "3rd Semester",
    year: "2nd Year",
    icon: "📐",
    image: "/images/ccmath3.webp",
    cardImage: "/images/ccmath3.webp",
    price: 699,
    originalPrice: 2200,
    discount: "68% OFF",
    tags: ["FREE CONTENT", "VIDEOS", "FILES"],
    description: "AKTU B.Tech 3rd Semester Engineering Mathematics-III: Fourier Series, Transforms, and Probability Distributions.",
    lessons: "42 Lessons",
    lectures: "112+ Video Lectures",
    students: "3.1K+ Students",
    rating: "4.9",
    validity: "7 Months",
    files: "54+ Files",
    features: [
      "Fourier Series & Half-Range Expansions",
      "Fourier & Z-Transforms",
      "Probability, Binomial & Poisson Distributions",
      "Curve Fitting & Correlation Regression"
    ]
  },
  {
    courseId: 12,
    title: "B.Tech Engineering Mathematics - IV (AKTU)",
    shortTitle: "AKTU B.Tech Engg. Math-IV",
    category: "Mathematics",
    branch: "All Branches",
    batchType: "Foundation",
    semester: "4th Semester",
    year: "2nd Year",
    icon: "📐",
    image: "/images/ccmath.webp",
    cardImage: "/images/ccmath.webp",
    price: 699,
    originalPrice: 2200,
    discount: "68% OFF",
    tags: ["FREE CONTENT", "VIDEOS", "FILES"],
    description: "AKTU B.Tech 4th Semester Engineering Mathematics-IV: Numerical Methods, Finite Differences, and Solution of ODEs.",
    lessons: "40 Lessons",
    lectures: "108+ Video Lectures",
    students: "2.5K+ Students",
    rating: "4.8",
    validity: "7 Months",
    files: "52+ Files",
    features: [
      "Solution of Algebraic & Transcendental Equations",
      "Interpolation & Newton's Divided Differences",
      "Numerical Integration (Simpson & Trapezoidal)",
      "Runge-Kutta & Predictor-Corrector Methods"
    ]
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jee_classes_meerut';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for seeding courses...');

    await Course.deleteMany({});
    console.log('Cleared existing courses collection.');

    const created = await Course.insertMany(initialCourses);
    console.log(`Successfully seeded ${created.length} AKTU B.Tech and Foundation courses into database.`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
};

seedDB();
