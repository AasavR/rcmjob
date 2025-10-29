import React, { useState } from 'react';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "E&V stands for ____________",
      options: [
        "a. Evaluation and Verification",
        "b. Eligibility and Verification",
        "c. Eligibility and Visualization",
        "d. Effectively and Visibility",
        "e. None of the above"
      ],
      correct: "b. Eligibility and Verification"
    },
    {
      question: "ABN is required by all commercial insurances. (True/False)",
      options: ["True", "False"],
      correct: "False"
    },
    {
      question: "CLIA waived CPTs are denoted by adding ___ modifier with CPT.",
      options: ["a. GV", "b. AS", "c. QW", "d. QS"],
      correct: "c. QW"
    },
    {
      question: "In case of a Participating provider Medicare would apply ____ %age of the allowed amount to coinsurance.",
      options: ["a. 20", "b. 60", "c. 80", "d. 50", "e. 40"],
      correct: "a. 20"
    },
    {
      question: "A privately purchased individual or group health insurance policies designed to supplement Medicare coverage. Benefits may include payment of Medicare deductibles and co-insurance.",
      options: ["a. Medicup", "b. Medigap", "c. Medicare advantage", "d. Medicare HMO", "e. None of these"],
      correct: "b. Medigap"
    },
    {
      question: "A person can opt for hospice plan if physician thinks patient will live ___months or less.",
      options: ["a. 6", "b. 8", "c. 9", "d. 15", "e. 5"],
      correct: "a. 6"
    },
    {
      question: "POS is not a combination of HMO and PPO. (True/False)",
      options: ["True", "False"],
      correct: "False"
    },
    {
      question: "Which of the following are CLIA levels?",
      options: [
        "a. Certification of Regeneration",
        "b. Certification of Allowance",
        "c. Certification of Performance",
        "d. Certification of Attendance",
        "e. Certification of Waiver"
      ],
      correct: "e. Certification of Waiver"
    },
    {
      question: "It is must to take the ________from PCP in case of _____ and _____ plans",
      options: [
        "a. Referral, HMO, PPO",
        "b. Authorization, POS, HMO",
        "c. Referral, PPO, POS",
        "d. Referral, HMO, POS",
        "e. Authorization, PPO , POS"
      ],
      correct: "a. Referral, HMO, PPO"
    },
    {
      question: "Medicare is always considered as last and the highest payer. (True/False)",
      options: ["True", "False"],
      correct: "False"
    },
    {
      question: "A Federal law that requires employers to offer continued health insurance coverage to certain employees and their beneficiaries whose group health insurance coverage has been terminated. Applies to employers with 20 or more eligible employees.",
      options: ["a. COBRA", "b. CORBA", "c. CBROA", "d. CORBA", "e. None of the above"],
      correct: "a. COBRA"
    },
    {
      question: "Codes which indicate provider specialty is called NPI.(True/False)",
      options: ["True", "False"],
      correct: "False"
    },
    {
      question: "Which of the following is full form of SCHIP?",
      options: [
        "a. Status of Child Health and Insurance Program",
        "b. State Children Healthy Insurance Program",
        "c. State Children Health Insurance Program",
        "d. School Children Healthy Insurance Program"
      ],
      correct: "c. State Children Health Insurance Program"
    },
    {
      question: "Billed Amount - $150, Allowed Amount - $100, Paid Amount - $80, Copay - $20, Adjustment - ____?",
      options: ["a. $50", "b. $20", "c. $70", "d. $60"],
      correct: "b. $20"
    },
    {
      question: "Insurance creates a list of CPTs with their allowed amounts which is called __________?",
      options: [
        "a. Balance Bill",
        "b. Procedure List",
        "c. Fee Schedule",
        "d. Allowed Amount List"
      ],
      correct: "c. Fee Schedule"
    },
    {
      question: "Medicare sends payment details directly to secondary insurance. This process is called ___________",
      options: ["a. Transfer", "b. Crossover", "c. Write-off", "d. Adjudication"],
      correct: "b. Crossover"
    },
    {
      question: "Which of the following best defines In-Network providers?",
      options: [
        "a. Providers who have a contract with the insurance company to provide services at pre-negotiated rates.",
        "b. Providers who do not accept any insurance and only take cash payments.",
        "c. Providers located only within the same city as the patient.",
        "d. Providers who charge patients the highest out-of-pocket costs."
      ],
      correct: "a. Providers who have a contract with the insurance company to provide services at pre-negotiated rates."
    },
    {
      question: "Which of the following best defines a referral in healthcare?",
      options: [
        "a. A written order from a primary care physician for a patient to see a specialist or receive certain medical services.",
        "b. A discount given by an insurance company for visiting a particular hospital.",
        "c. A process where patients can visit any doctor without prior approval.",
        "d. An agreement between two hospitals to share medical records."
      ],
      correct: "a. A written order from a primary care physician for a patient to see a specialist or receive certain medical services."
    },
    {
      question: "Which of the following are eligibility criteria for Medicare?",
      options: [
        "a. Individuals aged 65 or older.",
        "b. Individuals under 65 with certain disabilities.",
        "c. Individuals of any age with End-Stage Renal Disease (ESRD).",
        "d. All of the above."
      ],
      correct: "d. All of the above."
    },
    {
      question: "What is the full form of EDI in healthcare?",
      options: [
        "a. Electronic Data Interchange",
        "b. Emergency Department Information",
        "c. Electronic Document Integration",
        "d. Enhanced Data Infrastructure"
      ],
      correct: "a. Electronic Data Interchange"
    },
    {
      question: "The document that informs insurance companies about a patient's primary and secondary insurance is called:",
      options: [
        "a. Coordination of Benefits (COB) form",
        "b. Claim Adjustment Notice",
        "c. Insurance Premium Statement",
        "d. Medical Necessity Form"
      ],
      correct: "a. Coordination of Benefits (COB) form"
    },
    {
      question: "What does PHI stand for in healthcare?",
      options: [
        "a. Personal Health Information",
        "b. Protected Health Information",
        "c. Public Health Index",
        "d. Patient Health Identifier"
      ],
      correct: "b. Protected Health Information"
    },
    {
      question: "Choose the correct full form for each abbreviation:",
      options: [
        "a. EOB - Explanation of Benefits",
        "b. COB - Coordination of Benefits",
        "c. ABN - Advance Beneficiary Notice",
        "d. ROI - Release of Information",
        "e. HCFA - Health Care Financing Administration",
        "f. ERS - Electronic Remittance Statement",
        "g. PQRI - Physician Quality Reporting Initiative",
        "h. CMS - Centers for Medicare & Medicaid Services",
        "i. CPT - Current Procedural Terminology",
        "j. HMO - Health Maintenance Organization"
      ],
      correct: "All are correct"
    },
    {
      question: "____________ form is used to file a professional claim, whereas UB-04 is used for a hospital claim:",
      options: [
        "a. CMS-1500",
        "b. HCFA-1450",
        "c. ADA-200",
        "d. CMS-1200"
      ],
      correct: "a. CMS-1500"
    },
    {
      question: "What is Account Receivable?",
      options: [
        "a. Money owed by patients or insurance companies to the healthcare provider for services rendered",
        "b. Money paid in advance by patients before receiving services",
        "c. A list of all the hospital's employees",
        "d. Insurance claims that have been denied"
      ],
      correct: "a. Money owed by patients or insurance companies to the healthcare provider for services rendered"
    },
    {
      question: "The status of claims becomes 'Billed' after _____________",
      options: [
        "a. The claim has been submitted to the insurance company",
        "b. The patient has made full payment",
        "c. The claim has been denied",
        "d. The insurance company has processed the payment"
      ],
      correct: "a. The claim has been submitted to the insurance company"
    },
    {
      question: "Rules created on scrubber and Clearing House to filter claims are also known as:",
      options: ["Ruler", "Edits", "EDI", "ERS"],
      correct: "Edits"
    },
    {
      question: "What is the difference between a claim Denial and a claim Rejection?",
      options: [
        "a. Denial: The insurance company processes the claim but does not pay due to coverage or eligibility issues. Rejection: The claim is not processed at all due to errors or missing information.",
        "b. Denial: The claim is never submitted to insurance. Rejection: The claim is paid partially by insurance.",
        "c. Denial: The claim is processed and fully paid. Rejection: The claim is processed and partially paid.",
        "d. Denial: The claim is submitted for hospital services only. Rejection: The claim is submitted for professional services only."
      ],
      correct: "a. Denial: The insurance company processes the claim but does not pay due to coverage or eligibility issues. Rejection: The claim is not processed at all due to errors or missing information."
    },
    {
      question: "Digits in NPI are 10, whereas TIN has ________ digits:",
      options: ["a. 9", "b. 8", "c. 12", "d. 11"],
      correct: "a. 9"
    },
    {
      question: "Charge tickets are also known as ________________.",
      options: [
        "a. Super bills",
        "b. Encounter forms",
        "c. Patient service slips",
        "d. All of the above"
      ],
      correct: "d. All of the above"
    },
    {
      question: "What is the difference between a premium and a deductible?",
      options: [
        "a. Premium: The amount you pay periodically (monthly/annually) to keep your insurance active. Deductible: The amount you pay out-of-pocket for covered services before insurance starts paying.",
        "b. Premium: The amount paid only after using medical services. Deductible: The monthly payment to keep insurance active.",
        "c. Premium: A discount received from insurance for visiting preferred providers. Deductible: A penalty charged for late payments.",
        "d. Premium: The total cost of medical services. Deductible: The amount insurance pays on your behalf."
      ],
      correct: "a. Premium: The amount you pay periodically (monthly/annually) to keep your insurance active. Deductible: The amount you pay out-of-pocket for covered services before insurance starts paying."
    },
    {
      question: "What is a Modifier in medical billing?",
      options: [
        "a. A two-digit code added to a CPT or HCPCS code to provide additional information about the service performed",
        "b. A code that replaces the primary procedure code entirely",
        "c. A type of insurance plan for patients",
        "d. A document used to refer patients to specialists"
      ],
      correct: "a. A two-digit code added to a CPT or HCPCS code to provide additional information about the service performed"
    },
    {
      question: "What is the full form of EMC and its use in healthcare?",
      options: [
        "a. Electronic Media Communication – used for internal hospital announcements",
        "b. Electronic Medical Claim – used to submit healthcare claims electronically",
        "c. Emergency Medical Care – used for urgent patient treatment",
        "d. Electronic Management Code – used for coding hospital equipment"
      ],
      correct: "b. Electronic Medical Claim – used to submit healthcare claims electronically"
    },
    {
      question: "Waiting period is applied every time policy is renewed (True/False)",
      options: ["True", "False"],
      correct: "False"
    },
    {
      question: "In case of participating providers, allowed amount of Primary Insurance is considered as provider's full and final payment. (True/False)",
      options: ["True", "False"],
      correct: "True"
    },
    {
      question: "What is Evaluation and Management (E/M) in healthcare?",
      options: [
        "a. A process to assess and manage a patient's health, including history, examination, and medical decision-making",
        "b. A system for managing hospital billing only",
        "c. A method for scheduling patient appointments",
        "d. A code used exclusively for surgical procedures"
      ],
      correct: "a. A process to assess and manage a patient's health, including history, examination, and medical decision-making"
    },
    {
      question: "What is an Authorization in healthcare?",
      options: [
        "a. Official approval from an insurance company for a patient to receive specific medical services",
        "b. A patient's consent to share personal health information",
        "c. A process of billing the patient for services rendered",
        "d. A type of claim denial issued by insurance"
      ],
      correct: "a. Official approval from an insurance company for a patient to receive specific medical services"
    },
    {
      question: "What is the full form of COBRA in healthcare?",
      options: [
        "a. Consolidated Omnibus Budget Reconciliation Act",
        "b. Comprehensive Organizational Benefits and Reimbursement Act",
        "c. Clinical Oversight and Benefits Review Agreement",
        "d. Coverage of Benefits for Retired Adults"
      ],
      correct: "a. Consolidated Omnibus Budget Reconciliation Act"
    },
    {
      question: "What are the goals of managed care plans?",
      options: [
        "a. Improve the quality of care provided to patients",
        "b. Control healthcare costs",
        "c. Ensure efficient use of medical resources",
        "d. Promote preventive care and wellness",
        "e. All of the above"
      ],
      correct: "e. All of the above"
    },
    {
      question: "What is a New Patient in healthcare?",
      options: [
        "a. A patient who has not received any professional services from the provider or another provider of the same specialty in the same practice within the past three years",
        "b. A patient visiting the hospital for follow-up care",
        "c. A patient who has been seen within the past year by the same provider",
        "d. Any patient admitted for emergency services only"
      ],
      correct: "a. A patient who has not received any professional services from the provider or another provider of the same specialty in the same practice within the past three years"
    },
    {
      question: "CLIA is assigned by _______________",
      options: [
        "a. Centers for Medicare & Medicaid Services (CMS)",
        "b. Food and Drug Administration (FDA)",
        "c. American Medical Association (AMA)",
        "d. National Institutes of Health (NIH)"
      ],
      correct: "a. Centers for Medicare & Medicaid Services (CMS)"
    },
    {
      question: "ERA can be posted automatically to the system.",
      options: ["True", "False"],
      correct: "True"
    }
  ];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        score++;
      }
    });
    return score;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Quiz Results</h1>
        <div className="max-w-md mx-auto">
          <p className="text-lg mb-4">You scored {score} out of {questions.length}</p>
          <p className="text-lg mb-4">Percentage: {((score / questions.length) * 100).toFixed(2)}%</p>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setShowResults(false);
            }}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Training Assessment I – Basic RCM</h1>
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <label key={index} className="block">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleAnswer(option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={!answers[currentQuestion]}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
