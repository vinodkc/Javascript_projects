// ========================================
// DOM ELEMENTS
// ========================================

// Settings
const settingsPanel = document.getElementById('settingsPanel');
const difficultySelect = document.getElementById('difficulty');
const maxAttemptsSelect = document.getElementById('maxAttempts');
const startGameBtn = document.getElementById('startGameBtn');

// Game Area
const gameArea = document.getElementById('gameArea');
const rangeDisplay = document.getElementById('rangeDisplay');
const attemptsLeft = document.getElementById('attemptsLeft');
const scoreDisplay = document.getElementById('scoreDisplay');
const progressBar = document.getElementById('progressBar');

// Input
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');

// Feedback
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedbackText');
const hintContainer = document.getElementById('hintContainer');
const hintText = document.getElementById('hintText');

// Temperature
const currentTemp = document.getElementById('currentTemp');
const tempItems = document.querySelectorAll('.temp-item');

// History
const guessHistory = document.getElementById('guessHistory');

// Buttons
const hintBtn = document.getElementById('hintBtn');
const newGameBtn = document.getElementById('newGameBtn');

// Stats
const gamesPlayedEl = document.getElementById('gamesPlayed');
const gamesWonEl = document.getElementById('gamesWon');
const winRateEl = document.getElementById('winRate');
const bestScoreEl = document.getElementById('bestScore');
const resetStatsBtn = document.getElementById('resetStatsBtn');

// Modal
const gameOverModal = document.getElementById('gameOverModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalSecretNumber = document.getElementById('modalSecretNumber');
const modalAttempts = document.getElementById('modalAttempts');
const modalScore = document.getElementById('modalScore');
const playAgainBtn = document.getElementById('playAgainBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// ========================================
// GAME STATE
// ========================================

let gameState = {
    secretNumber: 0,
    minRange: 1,
    maxRange: 100,
    maxAttempts: 10,
    attemptsUsed: 0,
    guesses: [],
    score: 0,
    hintsUsed: 0,
    isGameActive: false,
    difficulty: 'medium'
};

// Statistics (persisted in localStorage)
let stats = {
    gamesPlayed: 0,
    gamesWon: 0,
    bestScore: 0
};

// ========================================
// DIFFICULTY SETTINGS
// ========================================

const difficultySettings = {
    easy: { min: 1, max: 50, baseScore: 50 },
    medium: { min: 1, max: 100, baseScore: 100 },
    hard: { min: 1, max: 500, baseScore: 500 },
    expert: { min: 1, max: 1000, baseScore: 1000 }
};

// ========================================
// INITIALIZATION
// ========================================

function init() {
    loadStats();
    updateStatsDisplay();
    attachEventListeners();
}

function attachEventListeners() {
    startGameBtn.addEventListener('click', startNewGame);
    guessBtn.addEventListener('click', makeGuess);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') makeGuess();
    });
    hintBtn.addEventListener('click', getHint);
    newGameBtn.addEventListener('click', startNewGame);
    playAgainBtn.addEventListener('click', () => {
        closeModal();
        startNewGame();
    });
    closeModalBtn.addEventListener('click', closeModal);
    resetStatsBtn.addEventListener('click', resetStatistics);
    
    // Close modal on outside click
    gameOverModal.addEventListener('click', (e) => {
        if (e.target === gameOverModal) closeModal();
    });
}

// ========================================
// GAME LOGIC
// ========================================

function startNewGame() {
    // Get settings
    const difficulty = difficultySelect.value;
    const maxAttempts = maxAttemptsSelect.value;
    
    // Set game state
    const settings = difficultySettings[difficulty];
    gameState = {
        secretNumber: generateRandomNumber(settings.min, settings.max),
        minRange: settings.min,
        maxRange: settings.max,
        maxAttempts: maxAttempts === 'unlimited' ? Infinity : parseInt(maxAttempts),
        attemptsUsed: 0,
        guesses: [],
        score: settings.baseScore,
        hintsUsed: 0,
        isGameActive: true,
        difficulty: difficulty
    };
    
    // Update UI
    settingsPanel.style.display = 'none';
    gameArea.style.display = 'block';
    rangeDisplay.textContent = `${settings.min} - ${settings.max}`;
    attemptsLeft.textContent = maxAttempts === 'unlimited' ? '∞' : maxAttempts;
    scoreDisplay.textContent = gameState.score;
    guessInput.value = '';
    guessInput.min = settings.min;
    guessInput.max = settings.max;
    guessInput.focus();
    guessHistory.innerHTML = '';
    feedbackText.textContent = 'Enter a number and click Guess!';
    feedbackText.className = 'feedback-text';
    hintContainer.style.display = 'none';
    updateProgressBar();
    resetTemperature();
    
    console.log(`Secret number: ${gameState.secretNumber} (for testing)`);
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeGuess() {
    if (!gameState.isGameActive) return;
    
    const guess = parseInt(guessInput.value);
    
    // Validation
    if (isNaN(guess)) {
        showFeedback('Please enter a valid number!', 'error');
        return;
    }
    
    if (guess < gameState.minRange || guess > gameState.maxRange) {
        showFeedback(`Please enter a number between ${gameState.minRange} and ${gameState.maxRange}!`, 'error');
        return;
    }
    
    if (gameState.guesses.includes(guess)) {
        showFeedback('You already guessed that number!', 'warning');
        return;
    }
    
    // Process guess
    gameState.attemptsUsed++;
    gameState.guesses.push(guess);
    guessInput.value = '';
    
    // Add to history
    addToHistory(guess);
    
    // Update attempts
    const remaining = gameState.maxAttempts - gameState.attemptsUsed;
    attemptsLeft.textContent = remaining === Infinity ? '∞' : remaining;
    updateProgressBar();
    
    // Check guess
    if (guess === gameState.secretNumber) {
        winGame();
    } else {
        // Calculate distance
        const distance = Math.abs(guess - gameState.secretNumber);
        const range = gameState.maxRange - gameState.minRange;
        const percentage = (distance / range) * 100;
        
        // Provide feedback
        if (guess < gameState.secretNumber) {
            showFeedback('📈 Too low! Try a higher number.', 'low');
        } else {
            showFeedback('📉 Too high! Try a lower number.', 'high');
        }
        
        // Update temperature
        updateTemperature(percentage);
        
        // Deduct points
        const pointsLost = Math.ceil(distance / 10);
        gameState.score = Math.max(0, gameState.score - pointsLost);
        scoreDisplay.textContent = gameState.score;
        
        // Check if out of attempts
        if (gameState.attemptsUsed >= gameState.maxAttempts) {
            loseGame();
        }
    }
}

function addToHistory(guess) {
    const guessItem = document.createElement('div');
    guessItem.className = 'guess-item';
    
    const distance = Math.abs(guess - gameState.secretNumber);
    let indicator = '';
    
    if (guess < gameState.secretNumber) {
        indicator = '↑';
        guessItem.classList.add('too-low');
    } else if (guess > gameState.secretNumber) {
        indicator = '↓';
        guessItem.classList.add('too-high');
    }
    
    guessItem.innerHTML = `
        <span class="guess-number">${guess}</span>
        <span class="guess-indicator">${indicator}</span>
        <span class="guess-distance">${distance} away</span>
    `;
    
    guessHistory.insertBefore(guessItem, guessHistory.firstChild);
}

function showFeedback(message, type) {
    feedbackText.textContent = message;
    feedbackText.className = `feedback-text ${type}`;
    
    // Animate
    feedback.classList.add('pulse');
    setTimeout(() => feedback.classList.remove('pulse'), 500);
}

function updateTemperature(distancePercentage) {
    // Reset all
    tempItems.forEach(item => item.classList.remove('active'));
    
    // Set active based on distance
    let index;
    if (distancePercentage > 50) {
        index = 0; // Ice cold
    } else if (distancePercentage > 30) {
        index = 1; // Cold
    } else if (distancePercentage > 15) {
        index = 2; // Warm
    } else if (distancePercentage > 5) {
        index = 3; // Hot
    } else {
        index = 4; // On fire!
    }
    
    tempItems[index].classList.add('active');
}

function resetTemperature() {
    tempItems.forEach(item => item.classList.remove('active'));
}

function updateProgressBar() {
    const percentage = (gameState.attemptsUsed / gameState.maxAttempts) * 100;
    progressBar.style.width = `${Math.min(percentage, 100)}%`;
    
    // Change color based on attempts
    if (percentage > 75) {
        progressBar.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
    } else if (percentage > 50) {
        progressBar.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)';
    } else {
        progressBar.style.background = 'linear-gradient(90deg, #10b981, #059669)';
    }
}

function getHint() {
    if (!gameState.isGameActive) return;
    
    gameState.hintsUsed++;
    gameState.score = Math.max(0, gameState.score - 10);
    scoreDisplay.textContent = gameState.score;
    
    // Generate hint
    let hint = '';
    const secret = gameState.secretNumber;
    
    if (gameState.hintsUsed === 1) {
        hint = secret % 2 === 0 ? 'The number is EVEN' : 'The number is ODD';
    } else if (gameState.hintsUsed === 2) {
        const mid = Math.floor((gameState.minRange + gameState.maxRange) / 2);
        hint = secret > mid ? `The number is greater than ${mid}` : `The number is less than or equal to ${mid}`;
    } else if (gameState.hintsUsed === 3) {
        hint = secret % 5 === 0 ? 'The number is divisible by 5' : 'The number is NOT divisible by 5';
    } else {
        const range = Math.floor((gameState.maxRange - gameState.minRange) / 4);
        const quarter = Math.floor(secret / range);
        hint = `The number is in the ${['first', 'second', 'third', 'fourth'][Math.min(quarter, 3)]} quarter of the range`;
    }
    
    hintText.textContent = hint;
    hintContainer.style.display = 'block';
    
    // Animate
    hintContainer.classList.add('pulse');
    setTimeout(() => hintContainer.classList.remove('pulse'), 500);
}

function winGame() {
    gameState.isGameActive = false;
    
    // Calculate bonus
    const attemptBonus = (gameState.maxAttempts - gameState.attemptsUsed) * 10;
    const finalScore = gameState.score + attemptBonus;
    
    // Update stats
    stats.gamesPlayed++;
    stats.gamesWon++;
    if (finalScore > stats.bestScore) {
        stats.bestScore = finalScore;
    }
    saveStats();
    updateStatsDisplay();
    
    // Show modal
    modalTitle.textContent = '🎉 Congratulations! You Won!';
    modalTitle.style.color = '#10b981';
    modalMessage.textContent = `You guessed the number in ${gameState.attemptsUsed} attempt${gameState.attemptsUsed > 1 ? 's' : ''}!`;
    modalSecretNumber.textContent = gameState.secretNumber;
    modalAttempts.textContent = gameState.attemptsUsed;
    modalScore.textContent = finalScore;
    showModal();
    
    // Update feedback
    showFeedback('🎯 Perfect! You guessed it!', 'success');
    
    // Add winning guess to history
    const guessItem = document.createElement('div');
    guessItem.className = 'guess-item correct';
    guessItem.innerHTML = `
        <span class="guess-number">${gameState.secretNumber}</span>
        <span class="guess-indicator">✓</span>
        <span class="guess-distance">CORRECT!</span>
    `;
    guessHistory.insertBefore(guessItem, guessHistory.firstChild);
}

function loseGame() {
    gameState.isGameActive = false;
    
    // Update stats
    stats.gamesPlayed++;
    saveStats();
    updateStatsDisplay();
    
    // Show modal
    modalTitle.textContent = '😔 Game Over!';
    modalTitle.style.color = '#ef4444';
    modalMessage.textContent = `You ran out of attempts! The secret number was ${gameState.secretNumber}.`;
    modalSecretNumber.textContent = gameState.secretNumber;
    modalAttempts.textContent = gameState.attemptsUsed;
    modalScore.textContent = 0;
    showModal();
    
    // Update feedback
    showFeedback(`Game Over! The number was ${gameState.secretNumber}`, 'error');
}

// ========================================
// MODAL
// ========================================

function showModal() {
    gameOverModal.style.display = 'flex';
    setTimeout(() => gameOverModal.classList.add('show'), 10);
}

function closeModal() {
    gameOverModal.classList.remove('show');
    setTimeout(() => {
        gameOverModal.style.display = 'none';
        settingsPanel.style.display = 'block';
        gameArea.style.display = 'none';
    }, 300);
}

// ========================================
// STATISTICS
// ========================================

function loadStats() {
    const saved = localStorage.getItem('numberGuessingStats');
    if (saved) {
        stats = JSON.parse(saved);
    }
}

function saveStats() {
    localStorage.setItem('numberGuessingStats', JSON.stringify(stats));
}

function updateStatsDisplay() {
    gamesPlayedEl.textContent = stats.gamesPlayed;
    gamesWonEl.textContent = stats.gamesWon;
    
    const winRate = stats.gamesPlayed > 0 
        ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
        : 0;
    winRateEl.textContent = `${winRate}%`;
    
    bestScoreEl.textContent = stats.bestScore;
}

function resetStatistics() {
    if (confirm('Are you sure you want to reset all statistics?')) {
        stats = {
            gamesPlayed: 0,
            gamesWon: 0,
            bestScore: 0
        };
        saveStats();
        updateStatsDisplay();
        alert('Statistics reset successfully!');
    }
}

// ========================================
// INITIALIZE ON LOAD
// ========================================

init();

console.log('Number Guessing Game loaded! 🎯');
console.log('Tip: Check console for secret number during testing');

