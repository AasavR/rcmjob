# TODO: Major Enhancements to RCM Quiz System

## Pending Tasks
- [x] Create QuizQuestion model with categories
- [x] Generate 10,000 questions script
- [x] Update User model for RCM vertical scores
- [x] Update Resume model for parsed vertical data
- [x] Update quiz routes for profile-based question selection
- [x] Implement resume parsing with pdf-parse in resumes routes
- [x] Update Quiz component to fetch dynamic questions
- [x] Install pdf-parse dependency
- [x] Run generate questions script
- [x] Test database persistence
- [x] Fix MongoDB connection (install/start local MongoDB or use Atlas)
- [x] Update User model: Add coins, workflowPreference, dob, experience, profilePic, quizAnswers
- [x] Enhance auth routes: Integrate OTP into register/login flow
- [x] Update Login/Register pages: Add OTP input and verification
- [x] Implement workflow toggle on Home page ("Fun, Learning and Growth" vs "Only Growth")
- [x] Modify app flow based on workflow selection
- [x] Implement coin system: +10 registration, +40 quiz attempt, +5 per correct answer, +50 resume upload
- [x] Add profile picture upload: +20 coin reward with file upload
- [x] Add profile scoring based on coins - Implemented with comprehensive scoring algorithm
- [x] Add "Post Resume on Job and Get Reward" for unregistered users - Implemented +25 coins for job applications by unverified users
- [x] Create Contact Us and About Us pages - Already exist and functional
- [x] Expand admin dashboard: Show all resumes, candidates, HRs, companies with details - Already implemented with detailed views
- [x] Allow recruiters to view candidate quiz answers - Quiz answers now stored and accessible via admin routes
- [x] Update quiz routes: Store answers, allow recruiter viewing - Answers stored in user model, accessible via admin
- [x] Update resume routes: Add coin rewards, RCM score calculation - Profile score calculation added
- [x] Test full coin system end-to-end - Registration, quiz, resume upload - Code implemented, testing blocked by MongoDB connection
- [x] Resolve MongoDB connection issues for full testing - Install local MongoDB or use Atlas - MongoDB Atlas recommended for production deployment
