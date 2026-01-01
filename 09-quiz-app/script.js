/**
 * ==============================================
 * QUIZ APP - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - Multi-screen navigation: Start → Quiz → Results → Review
 * - State management: Tracking current question, score, answers
 * - Array of objects: Structured quiz data
 * - Dynamic DOM creation: Building option buttons
 * - Event delegation: Click handlers on dynamic elements
 * - setTimeout: Delayed visual feedback
 * - Math.round: Percentage calculation
 * - Array push: Recording user answers
 * - forEach with index: Iterating with position
 * - Template literals: String interpolation
 * 
 * KEY LEARNING POINTS:
 * 1. Screen-based navigation pattern
 * 2. Managing quiz state across multiple screens
 * 3. Dynamic content generation
 * 4. Delayed UI updates with setTimeout
 * 5. Answer review system
 */

// ==============================================
// DOM ELEMENTS
// ==============================================

// Screen containers
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const reviewScreen = document.getElementById('reviewScreen');

// Navigation buttons
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const reviewBtn = document.getElementById('reviewBtn');
const backToResultBtn = document.getElementById('backToResultBtn');

// Quiz elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const progressBar = document.getElementById('progressBar');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');
const currentScoreEl = document.getElementById('currentScore');

// Result elements
const finalScoreEl = document.getElementById('finalScore');
const scorePercentageEl = document.getElementById('scorePercentage');
const scoreMessageEl = document.getElementById('scoreMessage');
const correctCountEl = document.getElementById('correctCount');
const incorrectCountEl = document.getElementById('incorrectCount');
const resultIconEl = document.getElementById('resultIcon');

// Review elements
const reviewListEl = document.getElementById('reviewList');

// ==============================================
// QUIZ DATA
// ==============================================

/**
 * Quiz questions stored as array of objects
 * LEARNING: Structured data organization
 * 
 * Each question object contains:
 * - question: The question text
 * - options: Array of possible answers
 * - correct: Index of correct answer (0-based)
 */
const quizData = [
    {
        question: "What does 'JS' stand for?",
        options: ["JavaScript", "JavaSource", "JustScript", "JScript"],
        correct: 0
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["/*", "//", "#", "<!--"],
        correct: 1
    },
    {
        question: "What is the correct way to declare a variable in modern JavaScript?",
        options: ["var x = 5", "let x = 5", "const x = 5", "Both let and const"],
        correct: 3
    },
    {
        question: "Which method is used to parse a string to an integer?",
        options: ["parseInt()", "parseInteger()", "toInt()", "Number()"],
        correct: 0
    },
    {
        question: "What does the '===' operator do?",
        options: ["Assigns a value", "Compares value and type", "Compares only value", "None of the above"],
        correct: 1
    },
    {
        question: "Which of these is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        correct: 2
    },
    {
        question: "What is the output of: typeof []?",
        options: ["array", "object", "Array", "list"],
        correct: 1
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0
    },
    {
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Digital Object Model"],
        correct: 0
    },
    {
        question: "Which keyword is used to create a function in JavaScript?",
        options: ["func", "function", "def", "create"],
        correct: 1
    }
];

// ==============================================
// STATE VARIABLES
// ==============================================

/**
 * currentQuestionIndex: Tracks which question is being shown
 * LEARNING: Index-based navigation through array
 */
let currentQuestionIndex = 0;

/**
 * score: Counts correct answers
 * LEARNING: Accumulator variable
 */
let score = 0;

/**
 * userAnswers: Records all user responses for review
 * LEARNING: Array to store history of actions
 */
let userAnswers = [];

// ==============================================
// QUIZ FLOW FUNCTIONS
// ==============================================

/**
 * Initializes quiz and shows first question
 * LEARNING: State reset and screen transition
 */
function startQuiz() {
    // Reset state variables
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    // Screen transition
    // LEARNING: Show/hide screens by toggling 'hidden' class
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    // Initialize displays
    totalQuestionsEl.textContent = quizData.length;
    currentScoreEl.textContent = score;
    
    // Load first question
    loadQuestion();
}

/**
 * Loads and displays current question
 * LEARNING: Dynamic content generation
 * 
 * Steps:
 * 1. Get current question data
 * 2. Update question text and progress
 * 3. Clear previous options
 * 4. Create new option buttons
 * 5. Attach event listeners
 */
function loadQuestion() {
    // Get question data from array
    // LEARNING: Array access with index
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Display question text
    questionEl.textContent = currentQuestion.question;
    
    // Update question counter (convert from 0-based to 1-based)
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    
    // Update progress bar
    // LEARNING: Percentage calculation
    // Example: Question 3 of 10 → (3/10) * 100 = 30%
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Clear previous options
    optionsEl.innerHTML = '';
    
    // Create option buttons dynamically
    // LEARNING: forEach with index parameter
    currentQuestion.options.forEach((option, index) => {
        // Create button element
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option';
        optionBtn.textContent = option;
        
        // Attach click handler
        // LEARNING: Closure captures index value
        optionBtn.addEventListener('click', () => selectOption(index));
        
        // Add to DOM
        optionsEl.appendChild(optionBtn);
    });
    
    // Hide Next button until answer is selected
    nextBtn.classList.add('hidden');
}

/**
 * Handles option selection and answer checking
 * LEARNING: Multi-step feedback with delayed animation
 * 
 * @param {number} selectedIndex - Index of selected option
 * 
 * Flow:
 * 1. Disable all options (prevent multiple selections)
 * 2. Highlight selected option
 * 3. Check if correct
 * 4. After delay, show correct/incorrect feedback
 * 5. Record answer
 * 6. Show Next button
 */
function selectOption(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Disable all options
    // LEARNING: Prevent multiple clicks during feedback animation
    options.forEach(option => {
        option.classList.add('disabled');
        option.style.pointerEvents = 'none';  // Disable click events
    });
    
    // Highlight selected option
    options[selectedIndex].classList.add('selected');
    
    // Check answer
    const isCorrect = selectedIndex === currentQuestion.correct;
    
    // Delayed feedback (300ms for smooth transition)
    // LEARNING: setTimeout for delayed execution
    setTimeout(() => {
        if (isCorrect) {
            // Correct answer
            options[selectedIndex].classList.remove('selected');
            options[selectedIndex].classList.add('correct');
            
            // Increment score
            score++;
            currentScoreEl.textContent = score;
        } else {
            // Incorrect answer
            options[selectedIndex].classList.remove('selected');
            options[selectedIndex].classList.add('incorrect');
            
            // Also highlight correct answer
            options[currentQuestion.correct].classList.add('correct');
        }
        
        // Record answer for review
        // LEARNING: Storing detailed answer data
        userAnswers.push({
            question: currentQuestion.question,
            userAnswer: selectedIndex,
            correctAnswer: currentQuestion.correct,
            options: currentQuestion.options,
            isCorrect: isCorrect
        });
        
        // Show Next button
        nextBtn.classList.remove('hidden');
    }, 300);  // 300 milliseconds delay
}

/**
 * Advances to next question or shows results
 * LEARNING: Conditional flow control
 */
function nextQuestion() {
    currentQuestionIndex++;
    
    // Check if more questions remain
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        // Quiz complete
        showResults();
    }
}

// ==============================================
// RESULTS DISPLAY
// ==============================================

/**
 * Displays final quiz results
 * LEARNING: Percentage calculation and conditional feedback
 */
function showResults() {
    // Screen transition
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    // Calculate percentage
    // LEARNING: Math.round() for whole number percentage
    const percentage = Math.round((score / quizData.length) * 100);
    
    // Display scores
    finalScoreEl.textContent = `${score}/${quizData.length}`;
    scorePercentageEl.textContent = `${percentage}%`;
    
    correctCountEl.textContent = score;
    incorrectCountEl.textContent = quizData.length - score;
    
    // Personalized feedback based on performance
    // LEARNING: Threshold-based categorization
    if (percentage >= 80) {
        // Excellent performance
        resultIconEl.textContent = '🎉';
        scoreMessageEl.textContent = 'Excellent! You\'re a JavaScript master!';
        scoreMessageEl.style.color = '#38a169';  // Green
    } else if (percentage >= 60) {
        // Good performance
        resultIconEl.textContent = '👍';
        scoreMessageEl.textContent = 'Good job! Keep practicing!';
        scoreMessageEl.style.color = '#d69e2e';  // Orange
    } else {
        // Needs improvement
        resultIconEl.textContent = '📚';
        scoreMessageEl.textContent = 'Keep learning! Practice makes perfect!';
        scoreMessageEl.style.color = '#e53e3e';  // Red
    }
}

/**
 * Returns to start screen
 * LEARNING: Resetting UI state
 */
function restartQuiz() {
    resultScreen.classList.add('hidden');
    reviewScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

// ==============================================
// ANSWER REVIEW
// ==============================================

/**
 * Displays detailed review of all answers
 * LEARNING: Dynamic list generation from stored data
 * 
 * For each question, shows:
 * - Question text
 * - User's answer (marked correct or incorrect)
 * - Correct answer (if user was wrong)
 */
function showReview() {
    // Screen transition
    resultScreen.classList.add('hidden');
    reviewScreen.classList.remove('hidden');
    
    // Clear previous review
    reviewListEl.innerHTML = '';
    
    // Generate review item for each answer
    // LEARNING: forEach with index for numbered list
    userAnswers.forEach((answer, index) => {
        // Create review item container
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        // Question text with number
        const questionText = document.createElement('div');
        questionText.className = 'review-question';
        questionText.textContent = `${index + 1}. ${answer.question}`;
        reviewItem.appendChild(questionText);
        
        if (answer.isCorrect) {
            // Correct answer: show single green line
            const correctAnswer = document.createElement('div');
            correctAnswer.className = 'review-answer both-correct';
            correctAnswer.textContent = `✓ Your answer: ${answer.options[answer.userAnswer]}`;
            reviewItem.appendChild(correctAnswer);
        } else {
            // Incorrect answer: show user's wrong answer and correct answer
            
            // User's incorrect answer (red)
            const userAnswer = document.createElement('div');
            userAnswer.className = 'review-answer your-answer';
            userAnswer.textContent = `✗ Your answer: ${answer.options[answer.userAnswer]}`;
            reviewItem.appendChild(userAnswer);
            
            // Correct answer (green)
            const correctAnswer = document.createElement('div');
            correctAnswer.className = 'review-answer correct-answer';
            correctAnswer.textContent = `✓ Correct answer: ${answer.options[answer.correctAnswer]}`;
            reviewItem.appendChild(correctAnswer);
        }
        
        // Add to review list
        reviewListEl.appendChild(reviewItem);
    });
}

/**
 * Returns to results screen from review
 * LEARNING: Bidirectional navigation
 */
function backToResults() {
    reviewScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * Navigation button handlers
 * LEARNING: Screen flow control through button clicks
 */
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
reviewBtn.addEventListener('click', showReview);
backToResultBtn.addEventListener('click', backToResults);
