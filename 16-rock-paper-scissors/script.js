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

const choices = ['rock', 'paper', 'scissors'];
const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

let scores = {
    player: 0,
    computer: 0,
    tie: 0
};

function loadScores() {
    const saved = localStorage.getItem('rpsScores');
    if (saved) {
        scores = JSON.parse(saved);
        updateScoreDisplay();
    }
}

function saveScores() {
    localStorage.setItem('rpsScores', JSON.stringify(scores));
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
        return 'player';
    }
    
    return 'computer';
}

function updateScoreDisplay() {
    playerScoreEl.textContent = scores.player;
    computerScoreEl.textContent = scores.computer;
    tieScoreEl.textContent = scores.tie;
    
    const totalGames = scores.player + scores.computer + scores.tie;
    gamesPlayedEl.textContent = totalGames;
    
    const winRate = totalGames > 0 ? ((scores.player / totalGames) * 100).toFixed(1) : 0;
    winRateEl.textContent = `${winRate}%`;
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    
    playerChoiceEl.style.animation = 'none';
    computerChoiceEl.style.animation = 'none';
    
    setTimeout(() => {
        playerChoiceEl.textContent = emojis[playerChoice];
        computerChoiceEl.textContent = emojis[computerChoice];
        
        playerChoiceEl.style.animation = 'pulse 0.5s ease';
        computerChoiceEl.style.animation = 'pulse 0.5s ease';
    }, 50);
    
    const winner = determineWinner(playerChoice, computerChoice);
    
    resultMessageEl.classList.remove('win', 'lose', 'tie');
    
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
    
    updateScoreDisplay();
    saveScores();
}

function resetScores() {
    if (confirm('Are you sure you want to reset all scores?')) {
        scores = {
            player: 0,
            computer: 0,
            tie: 0
        };
        
        playerChoiceEl.textContent = '❓';
        computerChoiceEl.textContent = '❓';
        resultMessageEl.textContent = 'Choose your weapon!';
        resultMessageEl.classList.remove('win', 'lose', 'tie');
        
        updateScoreDisplay();
        saveScores();
    }
}

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const choice = button.dataset.choice;
        playGame(choice);
    });
});

resetBtn.addEventListener('click', resetScores);

document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        playGame('rock');
    } else if (e.key === 'p' || e.key === 'P') {
        playGame('paper');
    } else if (e.key === 's' || e.key === 'S') {
        playGame('scissors');
    }
});

loadScores();

