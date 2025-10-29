const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const questions = [
  // Billing Questions
  {
    question: "What is the primary purpose of an Explanation of Benefits (EOB)?",
    options: [
      "a. To explain medical procedures to patients",
      "b. To detail how an insurance claim was processed and paid",
      "c. To provide billing instructions to providers",
      "d. To calculate patient co-payments"
    ],
    correct: "b. To detail how an insurance claim was processed and paid",
    category: "billing",
    difficulty: "easy",
    vertical: "billing"
  },
  {
    question: "Which modifier indicates a bilateral procedure?",
    options: ["a. -50", "b. -51", "c. -59", "d. -76"],
    correct: "a. -50",
    category: "billing",
    difficulty: "medium",
    vertical: "billing"
  },
  {
    question: "What does the term 'coinsurance' refer to?",
    options: [
      "a. A fixed dollar amount paid by the patient",
      "b. A percentage of costs paid by the patient after deductible",
      "c. The total amount charged by the provider",
      "d. The amount paid by insurance"
    ],
    correct: "b. A percentage of costs paid by the patient after deductible",
    category: "billing",
    difficulty: "easy",
    vertical: "billing"
  },
  {
    question: "What is the purpose of a prior authorization?",
    options: [
      "a. To approve payment after services are rendered",
      "b. To obtain approval before providing certain services",
      "c. To calculate the final bill amount",
      "d. To determine patient eligibility"
    ],
    correct: "b. To obtain approval before providing certain services",
    category: "billing",
    difficulty: "easy",
    vertical: "billing"
  },
  {
    question: "Which form is used for professional claims?",
    options: ["a. UB-04", "b. CMS-1500", "c. HCFA-1450", "d. ADA-2002"],
    correct: "b. CMS-1500",
    category: "billing",
    difficulty: "medium",
    vertical: "billing"
  },
  {
    question: "What does ABN stand for?",
    options: [
      "a. Advanced Billing Notice",
      "b. Advance Beneficiary Notice",
      "c. Automated Billing Network",
      "d. Annual Billing Notification"
    ],
    correct: "b. Advance Beneficiary Notice",
    category: "billing",
    difficulty: "medium",
    vertical: "billing"
  },
  {
    question: "What is the difference between a deductible and a copayment?",
    options: [
      "a. Deductible is a percentage, copayment is fixed",
      "b. Deductible is fixed, copayment is a percentage",
      "c. Both are fixed amounts",
      "d. Both are percentages"
    ],
    correct: "b. Deductible is fixed, copayment is a percentage",
    category: "billing",
    difficulty: "medium",
    vertical: "billing"
  },
  {
    question: "What does the modifier -25 indicate?",
    options: [
      "a. Multiple procedures on same day",
      "b. Significant, separately identifiable E/M service",
      "c. Bilateral procedure",
      "d. Repeat procedure"
    ],
    correct: "b. Significant, separately identifiable E/M service",
    category: "billing",
    difficulty: "hard",
    vertical: "billing"
  },
  {
    question: "What is a fee schedule?",
    options: [
      "a. A list of patient fees",
      "b. A schedule of insurance payment rates for procedures",
      "c. A calendar of billing deadlines",
      "d. A list of provider fees"
    ],
    correct: "b. A schedule of insurance payment rates for procedures",
    category: "billing",
    difficulty: "easy",
    vertical: "billing"
  },
  {
    question: "What does the term 'write-off' mean in medical billing?",
    options: [
      "a. Amount forgiven by the provider",
      "b. Amount written as a check",
      "c. Amount charged to the patient",
      "d. Amount paid by insurance"
    ],
    correct: "a. Amount forgiven by the provider",
    category: "billing",
    difficulty: "medium",
    vertical: "billing"
  },
  // Coding Questions
  {
    question: "What does ICD-10 stand for?",
    options: [
      "a. International Classification of Diseases, 10th Edition",
      "b. Internal Coding Database, 10th Version",
      "c. International Clinical Documentation, 10th Edition",
      "d. Internal Classification of Diagnoses, 10th Edition"
    ],
    correct: "a. International Classification of Diseases, 10th Edition",
    category: "coding",
    difficulty: "easy",
    vertical: "coding"
  },
  {
    question: "What is the purpose of CPT codes?",
    options: [
      "a. To classify diseases",
      "b. To describe medical procedures and services",
      "c. To identify medications",
      "d. To classify hospital stays"
    ],
    correct: "b. To describe medical procedures and services",
    category: "coding",
    difficulty: "easy",
    vertical: "coding"
  },
  {
    question: "Which organization maintains CPT codes?",
    options: ["a. WHO", "b. AMA", "c. CMS", "d. CDC"],
    correct: "b. AMA",
    category: "coding",
    difficulty: "medium",
    vertical: "coding"
  },
  {
    question: "What does HCPCS stand for?",
    options: [
      "a. Healthcare Common Procedure Coding System",
      "b. Hospital Coding and Payment Classification System",
      "c. Health Care Provider Coding Standards",
      "d. Healthcare Claims Processing and Coding System"
    ],
    correct: "a. Healthcare Common Procedure Coding System",
    category: "coding",
    difficulty: "medium",
    vertical: "coding"
  },
  {
    question: "What is the difference between ICD-10-CM and ICD-10-PCS?",
    options: [
      "a. CM is for diagnoses, PCS is for procedures",
      "b. CM is for procedures, PCS is for diagnoses",
      "c. Both are for diagnoses",
      "d. Both are for procedures"
    ],
    correct: "a. CM is for diagnoses, PCS is for procedures",
    category: "coding",
    difficulty: "hard",
    vertical: "coding"
  },
  {
    question: "What does the term 'coding specificity' refer to?",
    options: [
      "a. Using the most detailed code available",
      "b. Using general codes for all diagnoses",
      "c. Coding only primary diagnoses",
      "d. Using codes from memory"
    ],
    correct: "a. Using the most detailed code available",
    category: "coding",
    difficulty: "medium",
    vertical: "coding"
  },
  {
    question: "What is a DRG?",
    options: [
      "a. Diagnosis Related Group",
      "b. Drug Reference Guide",
      "c. Diagnostic Radiology Group",
      "d. Disease Registry Group"
    ],
    correct: "a. Diagnosis Related Group",
    category: "coding",
    difficulty: "medium",
    vertical: "coding"
  },
  {
    question: "What does the 'V' code series in ICD-10-CM represent?",
    options: [
      "a. Viral infections",
      "b. Vital signs",
      "c. Factors influencing health status",
      "d. Vascular diseases"
    ],
    correct: "c. Factors influencing health status",
    category: "coding",
    difficulty: "hard",
    vertical: "coding"
  },
  {
    question: "What is the purpose of modifiers in CPT coding?",
    options: [
      "a. To increase reimbursement",
      "b. To provide additional information about procedures",
      "c. To classify procedures",
      "d. To identify providers"
    ],
    correct: "b. To provide additional information about procedures",
    category: "coding",
    difficulty: "medium",
    vertical: "coding"
  },
  {
    question: "What does CCI stand for in coding?",
    options: [
      "a. Current Coding Index",
      "b. Correct Coding Initiative",
      "c. Clinical Coding Institute",
      "d. Comprehensive Coding Index"
    ],
    correct: "b. Correct Coding Initiative",
    category: "coding",
    difficulty: "hard",
    vertical: "coding"
  },
  // Claims Questions
  {
    question: "What is a clean claim?",
    options: [
      "a. A claim with no errors that can be processed immediately",
      "b. A claim that has been paid in full",
      "c. A claim for routine cleaning services",
      "d. A claim that requires no documentation"
    ],
    correct: "a. A claim with no errors that can be processed immediately",
    category: "claims",
    difficulty: "easy",
    vertical: "claims"
  },
  {
    question: "What does EOB stand for?",
    options: [
      "a. Explanation of Billing",
      "b. Explanation of Benefits",
      "c. Electronic Order of Benefits",
      "d. Emergency Outpatient Billing"
    ],
    correct: "b. Explanation of Benefits",
    category: "claims",
    difficulty: "easy",
    vertical: "claims"
  },
  {
    question: "What is the purpose of coordination of benefits?",
    options: [
      "a. To coordinate between different providers",
      "b. To determine which insurance is primary when patient has multiple policies",
      "c. To coordinate billing between hospitals",
      "d. To coordinate patient appointments"
    ],
    correct: "b. To determine which insurance is primary when patient has multiple policies",
    category: "claims",
    difficulty: "medium",
    vertical: "claims"
  },
  {
    question: "What does the term 'adjudication' mean in claims processing?",
    options: [
      "a. Reviewing and determining payment for claims",
      "b. Creating new claim forms",
      "c. Auditing provider billing",
      "d. Calculating patient balances"
    ],
    correct: "a. Reviewing and determining payment for claims",
    category: "claims",
    difficulty: "medium",
    vertical: "claims"
  },
  {
    question: "What is a remittance advice?",
    options: [
      "a. Advice on how to remit payment",
      "b. A document explaining how a claim was paid",
      "c. Advice on claim submission",
      "d. A list of outstanding balances"
    ],
    correct: "b. A document explaining how a claim was paid",
    category: "claims",
    difficulty: "medium",
    vertical: "claims"
  },
  {
    question: "What does ERA stand for?",
    options: [
      "a. Electronic Remittance Advice",
      "b. Emergency Response Authorization",
      "c. Electronic Records Administration",
      "d. Extended Review Application"
    ],
    correct: "a. Electronic Remittance Advice",
    category: "claims",
    difficulty: "medium",
    vertical: "claims"
  },
  {
    question: "What is the difference between a claim denial and rejection?",
    options: [
      "a. Denial is processed but not paid, rejection is not processed",
      "b. Denial is not processed, rejection is paid",
      "c. Both mean the claim is not paid",
      "d. Denial is temporary, rejection is permanent"
    ],
    correct: "a. Denial is processed but not paid, rejection is not processed",
    category: "claims",
    difficulty: "hard",
    vertical: "claims"
  },
  {
    question: "What is a provider contract?",
    options: [
      "a. A contract between patient and provider",
      "b. An agreement between provider and insurance company",
      "c. A contract for medical supplies",
      "d. An employment contract"
    ],
    correct: "b. An agreement between provider and insurance company",
    category: "claims",
    difficulty: "easy",
    vertical: "claims"
  },
  {
    question: "What does the term 'timely filing' refer to?",
    options: [
      "a. Filing claims on time",
      "b. Submitting claims within the allowed timeframe",
      "c. Filing taxes on time",
      "d. Completing paperwork quickly"
    ],
    correct: "b. Submitting claims within the allowed timeframe",
    category: "claims",
    difficulty: "medium",
    vertical: "claims"
  },
  {
    question: "What is a crossover claim?",
    options: [
      "a. A claim that crosses state lines",
      "b. Medicare payment information sent to secondary insurance",
      "c. A claim submitted to multiple insurers",
      "d. A claim that changes insurance companies"
    ],
    correct: "b. Medicare payment information sent to secondary insurance",
    category: "claims",
    difficulty: "hard",
    vertical: "claims"
  },
  // General Questions
  {
    question: "What does HIPAA stand for?",
    options: [
      "a. Health Insurance Portability and Accountability Act",
      "b. Healthcare Information Privacy and Protection Act",
      "c. Hospital Insurance Payment and Administration Act",
      "d. Health Information Privacy Act"
    ],
    correct: "a. Health Insurance Portability and Accountability Act",
    category: "general",
    difficulty: "easy",
    vertical: "billing"
  },
  {
    question: "What is the purpose of CLIA?",
    options: [
      "a. To regulate clinical laboratory testing",
      "b. To certify medical billing professionals",
      "c. To license healthcare providers",
      "d. To approve medical devices"
    ],
    correct: "a. To regulate clinical laboratory testing",
    category: "general",
    difficulty: "medium",
    vertical: "coding"
  },
  {
    question: "What does NPI stand for?",
    options: [
      "a. National Provider Identifier",
      "b. National Patient Index",
      "c. New Provider Information",
      "d. National Payment Identifier"
    ],
    correct: "a. National Provider Identifier",
    category: "general",
    difficulty: "easy",
    vertical: "claims"
  },
  {
    question: "What is Medicare?",
    options: [
      "a. A private insurance program",
      "b. A government health insurance program for people 65+",
      "c. A prescription drug program",
      "d. A dental insurance program"
    ],
    correct: "b. A government health insurance program for people 65+",
    category: "general",
    difficulty: "easy",
    vertical: "billing"
  },
  {
    question: "What does COBRA stand for?",
    options: [
      "a. Consolidated Omnibus Budget Reconciliation Act",
      "b. Comprehensive Organizational Benefits and Reimbursement Act",
      "c. Coverage of Benefits for Retired Adults",
      "d. Consolidated Operational Benefits and Recovery Act"
    ],
    correct: "a. Consolidated Omnibus Budget Reconciliation Act",
    category: "general",
    difficulty: "hard",
    vertical: "claims"
  },
  {
    question: "What is an HMO?",
    options: [
      "a. Health Maintenance Organization",
      "b. Hospital Medical Officer",
      "c. Healthcare Management Organization",
      "d. Health Monitoring Office"
    ],
    correct: "a. Health Maintenance Organization",
    category: "general",
    difficulty: "easy",
    vertical: "billing"
  },
  {
    question: "What does PPO stand for?",
    options: [
      "a. Preferred Provider Organization",
      "b. Patient Protection Organization",
      "c. Primary Provider Option",
      "d. Professional Practice Organization"
    ],
    correct: "a. Preferred Provider Organization",
    category: "general",
    difficulty: "easy",
    vertical: "claims"
  },
  {
    question: "What is workers' compensation?",
    options: [
      "a. Insurance for workplace injuries",
      "b. Compensation for overtime work",
      "c. Payment for employee training",
      "d. Benefits for retired workers"
    ],
    correct: "a. Insurance for workplace injuries",
    category: "general",
    difficulty: "medium",
    vertical: "billing"
  },
  {
    question: "What does EDI stand for?",
    options: [
      "a. Electronic Data Interchange",
      "b. Emergency Department Information",
      "c. Electronic Document Integration",
      "d. Enhanced Data Infrastructure"
    ],
    correct: "a. Electronic Data Interchange",
    category: "general",
    difficulty: "medium",
    vertical: "coding"
  },
  {
    question: "What is the purpose of medical necessity?",
    options: [
      "a. To determine if treatment is required",
      "b. To justify that services are reasonable and necessary",
      "c. To calculate treatment costs",
      "d. To schedule medical appointments"
    ],
    correct: "b. To justify that services are reasonable and necessary",
    category: "general",
    difficulty: "medium",
    vertical: "claims"
  }
];

// Function to generate variations of questions
function generateQuestionVariations(baseQuestions, targetCount = 10000) {
  const generatedQuestions = [...baseQuestions];
  const categories = ['billing', 'coding', 'claims', 'general'];
  const difficulties = ['easy', 'medium', 'hard'];
  const verticals = ['billing', 'coding', 'claims'];

  while (generatedQuestions.length < targetCount) {
    const baseQuestion = baseQuestions[Math.floor(Math.random() * baseQuestions.length)];
    const variation = {
      ...baseQuestion,
      question: baseQuestion.question + ' (Variation ' + (generatedQuestions.length + 1) + ')',
      category: categories[Math.floor(Math.random() * categories.length)],
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      vertical: verticals[Math.floor(Math.random() * verticals.length)]
    };
    generatedQuestions.push(variation);
  }

  return generatedQuestions.slice(0, targetCount);
}

async function connectDB() {
  try {
    // Try to connect to local MongoDB first
    const localUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rcmjob';
    await mongoose.connect(localUri);
    console.log('Connected to local MongoDB');
  } catch (localError) {
    console.error('Error connecting to local MongoDB:', localError.message);
    console.log('Please ensure MongoDB is installed and running locally, or check your MONGODB_URI environment variable.');
    console.log('For development, you can install MongoDB Community Server or use MongoDB Atlas.');
    process.exit(1);
  }
}

async function generateAndInsertQuestions() {
  try {
    await connectDB();

    const allQuestions = generateQuestionVariations(questions, 10000);

    await QuizQuestion.deleteMany({}); // Clear existing questions
    await QuizQuestion.insertMany(allQuestions);

    console.log(`Successfully generated and inserted ${allQuestions.length} quiz questions`);
    process.exit(0);
  } catch (error) {
    console.error('Error generating questions:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  generateAndInsertQuestions();
}

module.exports = { generateQuestionVariations };
