const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const reviewScreen = document.getElementById('reviewScreen');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const reviewBtn = document.getElementById('reviewBtn');
const backToResultBtn = document.getElementById('backToResultBtn');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const progressBar = document.getElementById('progressBar');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');
const currentScoreEl = document.getElementById('currentScore');
const finalScoreEl = document.getElementById('finalScore');
const scorePercentageEl = document.getElementById('scorePercentage');
const scoreMessageEl = document.getElementById('scoreMessage');
const correctCountEl = document.getElementById('correctCount');
const incorrectCountEl = document.getElementById('incorrectCount');
const resultIconEl = document.getElementById('resultIcon');
const reviewListEl = document.getElementById('reviewList');

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

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    totalQuestionsEl.textContent = quizData.length;
    currentScoreEl.textContent = score;
    
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    
    questionEl.textContent = currentQuestion.question;
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    optionsEl.innerHTML = '';
    
    currentQuestion.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => selectOption(index));
        optionsEl.appendChild(optionBtn);
    });
    
    nextBtn.classList.add('hidden');
}

function selectOption(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    options.forEach(option => {
        option.classList.add('disabled');
        option.style.pointerEvents = 'none';
    });
    
    options[selectedIndex].classList.add('selected');
    
    const isCorrect = selectedIndex === currentQuestion.correct;
    
    setTimeout(() => {
        if (isCorrect) {
            options[selectedIndex].classList.remove('selected');
            options[selectedIndex].classList.add('correct');
            score++;
            currentScoreEl.textContent = score;
        } else {
            options[selectedIndex].classList.remove('selected');
            options[selectedIndex].classList.add('incorrect');
            options[currentQuestion.correct].classList.add('correct');
        }
        
        userAnswers.push({
            question: currentQuestion.question,
            userAnswer: selectedIndex,
            correctAnswer: currentQuestion.correct,
            options: currentQuestion.options,
            isCorrect: isCorrect
        });
        
        nextBtn.classList.remove('hidden');
    }, 300);
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const percentage = Math.round((score / quizData.length) * 100);
    
    finalScoreEl.textContent = `${score}/${quizData.length}`;
    scorePercentageEl.textContent = `${percentage}%`;
    
    correctCountEl.textContent = score;
    incorrectCountEl.textContent = quizData.length - score;
    
    if (percentage >= 80) {
        resultIconEl.textContent = '🎉';
        scoreMessageEl.textContent = 'Excellent! You\'re a JavaScript master!';
        scoreMessageEl.style.color = '#38a169';
    } else if (percentage >= 60) {
        resultIconEl.textContent = '👍';
        scoreMessageEl.textContent = 'Good job! Keep practicing!';
        scoreMessageEl.style.color = '#d69e2e';
    } else {
        resultIconEl.textContent = '📚';
        scoreMessageEl.textContent = 'Keep learning! Practice makes perfect!';
        scoreMessageEl.style.color = '#e53e3e';
    }
}

function restartQuiz() {
    resultScreen.classList.add('hidden');
    reviewScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

function showReview() {
    resultScreen.classList.add('hidden');
    reviewScreen.classList.remove('hidden');
    
    reviewListEl.innerHTML = '';
    
    userAnswers.forEach((answer, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        const questionText = document.createElement('div');
        questionText.className = 'review-question';
        questionText.textContent = `${index + 1}. ${answer.question}`;
        reviewItem.appendChild(questionText);
        
        if (answer.isCorrect) {
            const correctAnswer = document.createElement('div');
            correctAnswer.className = 'review-answer both-correct';
            correctAnswer.textContent = `✓ Your answer: ${answer.options[answer.userAnswer]}`;
            reviewItem.appendChild(correctAnswer);
        } else {
            const userAnswer = document.createElement('div');
            userAnswer.className = 'review-answer your-answer';
            userAnswer.textContent = `✗ Your answer: ${answer.options[answer.userAnswer]}`;
            reviewItem.appendChild(userAnswer);
            
            const correctAnswer = document.createElement('div');
            correctAnswer.className = 'review-answer correct-answer';
            correctAnswer.textContent = `✓ Correct answer: ${answer.options[answer.correctAnswer]}`;
            reviewItem.appendChild(correctAnswer);
        }
        
        reviewListEl.appendChild(reviewItem);
    });
}

function backToResults() {
    reviewScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
reviewBtn.addEventListener('click', showReview);
backToResultBtn.addEventListener('click', backToResults);

