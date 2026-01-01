// ========================================
// CARD THEMES
// ========================================

const cardThemes = {
    emojis: ['😀', '🎉', '❤️', '⭐', '🎨', '🎮', '🎵', '🚀', '🌈', '🔥', '💎', '🎯'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'],
    fruits: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍑', '🍒', '🍍', '🥝', '🥑'],
    numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
};

// ========================================
// DOM ELEMENTS
// ========================================

// Settings
const settingsPanel = document.getElementById('settingsPanel');
const difficultySelect = document.getElementById('difficulty');
const themeSelect = document.getElementById('theme');
const startGameBtn = document.getElementById('startGameBtn');

// Game Area
const gameArea = document.getElementById('gameArea');
const gameBoard = document.getElementById('gameBoard');
const timerEl = document.getElementById('timer');
const movesEl = document.getElementById('moves');
const pairsFoundEl = document.getElementById('pairsFound');
const totalPairsEl = document.getElementById('totalPairs');
const accuracyEl = document.getElementById('accuracy');

// Buttons
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const newGameBtn = document.getElementById('newGameBtn');

// Leaderboard
const leaderboardList = document.getElementById('leaderboardList');
const clearRecordsBtn = document.getElementById('clearRecordsBtn');

// Modal
const victoryModal = document.getElementById('victoryModal');
const modalTime = document.getElementById('modalTime');
const modalMoves = document.getElementById('modalMoves');
const modalAccuracy = document.getElementById('modalAccuracy');
const modalStars = document.getElementById('modalStars');
const newRecordBadge = document.getElementById('newRecordBadge');
const playAgainBtn = document.getElementById('playAgainBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// Pause Overlay
const pauseOverlay = document.getElementById('pauseOverlay');
const resumeBtn = document.getElementById('resumeBtn');

// ========================================
// GAME STATE
// ========================================

let gameState = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    totalPairs: 0,
    moves: 0,
    startTime: null,
    elapsedTime: 0,
    timerInterval: null,
    isPaused: false,
    isGameActive: false,
    difficulty: 'medium',
    theme: 'emojis',
    canFlip: true
};

// Difficulty settings
const difficultySettings = {
    easy: { pairs: 6, columns: 4 },
    medium: { pairs: 8, columns: 4 },
    hard: { pairs: 10, columns: 5 },
    expert: { pairs: 12, columns: 6 }
};

// ========================================
// INITIALIZATION
// ========================================

function init() {
    attachEventListeners();
    loadLeaderboard();
}

function attachEventListeners() {
    startGameBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    resumeBtn.addEventListener('click', togglePause);
    restartBtn.addEventListener('click', restartGame);
    newGameBtn.addEventListener('click', newGame);
    playAgainBtn.addEventListener('click', () => {
        closeModal();
        startGame();
    });
    closeModalBtn.addEventListener('click', () => {
        closeModal();
        newGame();
    });
    clearRecordsBtn.addEventListener('click', clearLeaderboard);
}

// ========================================
// GAME LOGIC
// ========================================

function startGame() {
    // Get settings
    gameState.difficulty = difficultySelect.value;
    gameState.theme = themeSelect.value;
    
    const settings = difficultySettings[gameState.difficulty];
    gameState.totalPairs = settings.pairs;
    
    // Initialize game state
    gameState.matchedPairs = 0;
    gameState.moves = 0;
    gameState.flippedCards = [];
    gameState.startTime = Date.now();
    gameState.elapsedTime = 0;
    gameState.isPaused = false;
    gameState.isGameActive = true;
    gameState.canFlip = true;
    
    // Update UI
    settingsPanel.style.display = 'none';
    gameArea.style.display = 'block';
    totalPairsEl.textContent = gameState.totalPairs;
    pairsFoundEl.textContent = 0;
    movesEl.textContent = 0;
    accuracyEl.textContent = '100%';
    pauseBtn.textContent = '⏸️ Pause';
    
    // Create and shuffle cards
    createCards();
    
    // Start timer
    startTimer();
}

function createCards() {
    // Get cards for this theme and difficulty
    const themeCards = cardThemes[gameState.theme];
    const selectedCards = themeCards.slice(0, gameState.totalPairs);
    
    // Create pairs (duplicate each card)
    const cardPairs = [...selectedCards, ...selectedCards];
    
    // Shuffle cards
    gameState.cards = shuffleArray(cardPairs);
    
    // Render cards
    renderCards();
}

function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function renderCards() {
    gameBoard.innerHTML = '';
    
    // Set grid columns based on difficulty
    const settings = difficultySettings[gameState.difficulty];
    gameBoard.style.gridTemplateColumns = `repeat(${settings.columns}, 1fr)`;
    
    // Create card elements
    gameState.cards.forEach((cardValue, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.value = cardValue;
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${cardValue}</div>
            </div>
        `;
        
        card.addEventListener('click', () => flipCard(card, index));
        gameBoard.appendChild(card);
    });
}

function flipCard(card, index) {
    // Don't flip if game not active, paused, card already flipped, or can't flip
    if (!gameState.isGameActive || 
        gameState.isPaused || 
        card.classList.contains('flipped') || 
        card.classList.contains('matched') ||
        !gameState.canFlip) {
        return;
    }
    
    // Flip the card
    card.classList.add('flipped');
    gameState.flippedCards.push({ card, index, value: card.dataset.value });
    
    // Check if two cards are flipped
    if (gameState.flippedCards.length === 2) {
        gameState.canFlip = false;
        gameState.moves++;
        movesEl.textContent = gameState.moves;
        updateAccuracy();
        
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = gameState.flippedCards;
    
    if (card1.value === card2.value) {
        // Match found!
        setTimeout(() => {
            card1.card.classList.add('matched');
            card2.card.classList.add('matched');
            gameState.matchedPairs++;
            pairsFoundEl.textContent = gameState.matchedPairs;
            gameState.flippedCards = [];
            gameState.canFlip = true;
            
            // Check if game is won
            if (gameState.matchedPairs === gameState.totalPairs) {
                winGame();
            }
        }, 500);
    } else {
        // No match - flip back
        setTimeout(() => {
            card1.card.classList.remove('flipped');
            card2.card.classList.remove('flipped');
            gameState.flippedCards = [];
            gameState.canFlip = true;
        }, 1000);
    }
}

function updateAccuracy() {
    // Perfect moves = total pairs
    // Accuracy = (perfect moves / actual moves) * 100
    const perfectMoves = gameState.totalPairs;
    const accuracy = Math.round((perfectMoves / gameState.moves) * 100);
    accuracyEl.textContent = `${Math.min(accuracy, 100)}%`;
}

function calculateStars() {
    const perfectMoves = gameState.totalPairs;
    const moves = gameState.moves;
    
    if (moves === perfectMoves) {
        return '⭐⭐⭐'; // Perfect!
    } else if (moves <= perfectMoves * 1.5) {
        return '⭐⭐'; // Great!
    } else {
        return '⭐'; // Good!
    }
}

// ========================================
// TIMER
// ========================================

function startTimer() {
    gameState.timerInterval = setInterval(() => {
        if (!gameState.isPaused && gameState.isGameActive) {
            gameState.elapsedTime = Date.now() - gameState.startTime;
            updateTimerDisplay();
        }
    }, 100);
}

function updateTimerDisplay() {
    const seconds = Math.floor(gameState.elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function stopTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

// ========================================
// GAME CONTROLS
// ========================================

function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    
    if (gameState.isPaused) {
        pauseBtn.textContent = '▶️ Resume';
        pauseOverlay.style.display = 'flex';
        
        // Adjust start time to account for pause
        gameState.startTime = Date.now() - gameState.elapsedTime;
    } else {
        pauseBtn.textContent = '⏸️ Pause';
        pauseOverlay.style.display = 'none';
        
        // Resume timer
        gameState.startTime = Date.now() - gameState.elapsedTime;
    }
}

function restartGame() {
    if (confirm('Are you sure you want to restart? Your progress will be lost.')) {
        stopTimer();
        startGame();
    }
}

function newGame() {
    stopTimer();
    gameState.isGameActive = false;
    settingsPanel.style.display = 'block';
    gameArea.style.display = 'none';
    pauseOverlay.style.display = 'none';
}

// ========================================
// WIN GAME
// ========================================

function winGame() {
    gameState.isGameActive = false;
    stopTimer();
    
    // Calculate stats
    const timeInSeconds = Math.floor(gameState.elapsedTime / 1000);
    const accuracy = Math.round((gameState.totalPairs / gameState.moves) * 100);
    const stars = calculateStars();
    
    // Update modal
    modalTime.textContent = timerEl.textContent;
    modalMoves.textContent = gameState.moves;
    modalAccuracy.textContent = `${Math.min(accuracy, 100)}%`;
    modalStars.textContent = stars;
    
    // Check if new record
    const isNewRecord = saveToLeaderboard(timeInSeconds, gameState.moves);
    if (isNewRecord) {
        newRecordBadge.style.display = 'block';
    } else {
        newRecordBadge.style.display = 'none';
    }
    
    // Show victory modal
    showModal();
}

// ========================================
// LEADERBOARD
// ========================================

function saveToLeaderboard(time, moves) {
    const records = JSON.parse(localStorage.getItem('memoryGameRecords') || '[]');
    
    const newRecord = {
        difficulty: gameState.difficulty,
        time: time,
        moves: moves,
        date: new Date().toISOString()
    };
    
    records.push(newRecord);
    
    // Sort by time (ascending)
    records.sort((a, b) => a.time - b.time);
    
    // Keep top 10
    const topRecords = records.slice(0, 10);
    localStorage.setItem('memoryGameRecords', JSON.stringify(topRecords));
    
    loadLeaderboard();
    
    // Check if this is a new best time for this difficulty
    const difficultyRecords = topRecords.filter(r => r.difficulty === gameState.difficulty);
    return difficultyRecords.length > 0 && difficultyRecords[0].time === time;
}

function loadLeaderboard() {
    const records = JSON.parse(localStorage.getItem('memoryGameRecords') || '[]');
    
    if (records.length === 0) {
        leaderboardList.innerHTML = '<p class="no-records">No records yet. Play some games!</p>';
        return;
    }
    
    leaderboardList.innerHTML = '';
    
    records.forEach((record, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        
        const minutes = Math.floor(record.time / 60);
        const seconds = record.time % 60;
        const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        const difficultyIcon = {
            easy: '🟢',
            medium: '🟡',
            hard: '🟠',
            expert: '🔴'
        }[record.difficulty];
        
        item.innerHTML = `
            <span class="rank">${index + 1}</span>
            <span class="difficulty-col">${difficultyIcon} ${record.difficulty}</span>
            <span class="time">${timeStr}</span>
            <span class="moves-col">${record.moves} moves</span>
        `;
        
        leaderboardList.appendChild(item);
    });
}

function clearLeaderboard() {
    if (confirm('Are you sure you want to clear all records?')) {
        localStorage.removeItem('memoryGameRecords');
        loadLeaderboard();
    }
}

// ========================================
// MODAL
// ========================================

function showModal() {
    victoryModal.style.display = 'flex';
    setTimeout(() => victoryModal.classList.add('show'), 10);
}

function closeModal() {
    victoryModal.classList.remove('show');
    setTimeout(() => {
        victoryModal.style.display = 'none';
    }, 300);
}

// ========================================
// INITIALIZE
// ========================================

init();

console.log('Memory Card Game loaded! 🧠');
console.log('Available themes:', Object.keys(cardThemes));

