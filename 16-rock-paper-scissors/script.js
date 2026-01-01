/**
 * ==============================================
 * ROCK PAPER SCISSORS - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - Game Logic: Conditional rules for determining winner
 * - Random Selection: Computer opponent
 * - Score Tracking: Persistent with localStorage
 * - Win Rate Calculation: Percentage with toFixed()
 * - CSS Animations: Triggering with style.animation
 * - Keyboard Shortcuts: Letter keys for gameplay
 * - Object Mapping: Emoji associations
 * - setTimeout: Animation reset technique
 * 
 * KEY LEARNING POINTS:
 * 1. Game rules implementation with conditionals
 * 2. Random AI opponent
 * 3. Animation triggering from JavaScript
 * 4. Score persistence
 * 5. Statistical calculations (win rate)
 */

// ==============================================
// DOM ELEMENTS
// ==============================================
const choiceButtons = document.querySelectorAll('.choice-btn');
const playerChoiceEl = document.getElementById('playerChoice');
const computerChoiceEl = document.getElementById('computerChoice');
const resultMessageEl = document.getElementById('resultMessage');
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const tieScoreEl = document.getElementById('tieScore');
const gamesPlayedEl = document.getElementById('gamesPlayed');
const winRateEl = document.getElementById('winRate');
const resetBtn = document.getElementById('resetBtn');

// ==============================================
// GAME DATA
// ==============================================

/**
 * Available choices
 * LEARNING: Array for consistent choice options
 */
const choices = ['rock', 'paper', 'scissors'];

/**
 * Emoji mapping for visual representation
 * LEARNING: Object as lookup table
 */
const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

/**
 * Score tracking object
 * LEARNING: Organized state management
 */
let scores = {
    player: 0,
    computer: 0,
    tie: 0
};

// ==============================================
// PERSISTENCE
// ==============================================

/**
 * Loads saved scores from localStorage
 * LEARNING: Restoring application state
 */
function loadScores() {
    const saved = localStorage.getItem('rpsScores');
    if (saved) {
        scores = JSON.parse(saved);
        updateScoreDisplay();
    }
}

/**
 * Saves scores to localStorage
 */
function saveScores() {
    localStorage.setItem('rpsScores', JSON.stringify(scores));
}

// ==============================================
// GAME LOGIC
// ==============================================

/**
 * Randomly selects computer's choice
 * LEARNING: Random array element selection
 * 
 * @returns {string} 'rock', 'paper', or 'scissors'
 */
function getComputerChoice() {
    // Generate random index
    // LEARNING: Math.floor(Math.random() * length)
    // Example: choices.length = 3
    // Math.random() = 0.7
    // 0.7 * 3 = 2.1
    // Math.floor(2.1) = 2
    // choices[2] = 'scissors'
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/**
 * Determines winner based on game rules
 * LEARNING: Game logic with conditional statements
 * 
 * @param {string} playerChoice - Player's choice
 * @param {string} computerChoice - Computer's choice
 * @returns {string} 'player', 'computer', or 'tie'
 * 
 * Rules:
 * - Rock beats Scissors
 * - Scissors beats Paper
 * - Paper beats Rock
 */
function determineWinner(playerChoice, computerChoice) {
    // Check for tie first
    // LEARNING: Early return pattern
    if (playerChoice === computerChoice) {
        return 'tie';
    }
    
    // Check player win conditions
    // LEARNING: Compound conditional with ||
    // All three winning combinations for player
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
        return 'player';
    }
    
    // If not tie and not player win, must be computer win
    return 'computer';
}

// ==============================================
// DISPLAY UPDATES
// ==============================================

/**
 * Updates all score displays
 * LEARNING: Calculated stats from raw data
 */
function updateScoreDisplay() {
    // Update basic scores
    playerScoreEl.textContent = scores.player;
    computerScoreEl.textContent = scores.computer;
    tieScoreEl.textContent = scores.tie;
    
    // Calculate total games
    const totalGames = scores.player + scores.computer + scores.tie;
    gamesPlayedEl.textContent = totalGames;
    
    // Calculate win rate
    // LEARNING: Percentage calculation with division by zero check
    // (wins / total) × 100
    // toFixed(1) = one decimal place
    const winRate = totalGames > 0 ? ((scores.player / totalGames) * 100).toFixed(1) : 0;
    winRateEl.textContent = `${winRate}%`;
}

// ==============================================
// GAMEPLAY
// ==============================================

/**
 * Plays a round of the game
 * LEARNING: Animation triggering and state updates
 * 
 * @param {string} playerChoice - Player's selected choice
 * 
 * Flow:
 * 1. Get computer choice
 * 2. Animate choice reveal
 * 3. Determine winner
 * 4. Update scores
 * 5. Display result
 */
function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    
    // Reset animations
    // LEARNING: Setting animation to 'none' then reapplying triggers restart
    playerChoiceEl.style.animation = 'none';
    computerChoiceEl.style.animation = 'none';
    
    // Update choices with animation
    // LEARNING: setTimeout for animation reset
    // 50ms delay ensures browser processes the 'none' before reapplying
    setTimeout(() => {
        // Display choices
        playerChoiceEl.textContent = emojis[playerChoice];
        computerChoiceEl.textContent = emojis[computerChoice];
        
        // Trigger animations
        playerChoiceEl.style.animation = 'pulse 0.5s ease';
        computerChoiceEl.style.animation = 'pulse 0.5s ease';
    }, 50);
    
    // Determine winner
    const winner = determineWinner(playerChoice, computerChoice);
    
    // Clear previous result styling
    resultMessageEl.classList.remove('win', 'lose', 'tie');
    
    // Update result based on winner
    // LEARNING: Different messages and styling for each outcome
    if (winner === 'player') {
        scores.player++;
        resultMessageEl.textContent = '🎉 You Win!';
        resultMessageEl.classList.add('win');
    } else if (winner === 'computer') {
        scores.computer++;
        resultMessageEl.textContent = '😢 You Lose!';
        resultMessageEl.classList.add('lose');
    } else {
        scores.tie++;
        resultMessageEl.textContent = '🤝 It\'s a Tie!';
        resultMessageEl.classList.add('tie');
    }
    
    // Update displays and save
    updateScoreDisplay();
    saveScores();
}

/**
 * Resets all scores with confirmation
 * LEARNING: Resetting multiple UI elements
 */
function resetScores() {
    if (confirm('Are you sure you want to reset all scores?')) {
        // Reset scores object
        scores = {
            player: 0,
            computer: 0,
            tie: 0
        };
        
        // Reset choice displays
        playerChoiceEl.textContent = '❓';
        computerChoiceEl.textContent = '❓';
        
        // Reset result message
        resultMessageEl.textContent = 'Choose your weapon!';
        resultMessageEl.classList.remove('win', 'lose', 'tie');
        
        // Update displays and save
        updateScoreDisplay();
        saveScores();
    }
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * Choice button handlers
 * LEARNING: Data attribute for button values
 */
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get choice from data attribute
        const choice = button.dataset.choice;
        playGame(choice);
    });
});

/**
 * Reset button handler
 */
resetBtn.addEventListener('click', resetScores);

/**
 * Keyboard shortcuts
 * LEARNING: Letter keys for quick gameplay
 * 
 * R = Rock
 * P = Paper
 * S = Scissors
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        playGame('rock');
    } else if (e.key === 'p' || e.key === 'P') {
        playGame('paper');
    } else if (e.key === 's' || e.key === 'S') {
        playGame('scissors');
    }
});

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Load saved scores on page load
 */
loadScores();
