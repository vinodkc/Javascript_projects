# Rock Paper Scissors Game

A classic Rock Paper Scissors game against the computer with score tracking and statistics.

## 🎯 Learning Objectives

By completing this project, you will:
- Master game logic with conditional statements
- Learn random selection for AI opponent
- Understand localStorage for score persistence
- Implement win rate calculations
- Work with keyboard event handling
- Create visual feedback for game results

## 📚 What You'll Learn

### Core Concepts
1. **Game Logic**: Compare choices and determine winner
2. **Random Selection**: Computer AI using Math.random()
3. **Score Tracking**: Persistent score with localStorage
4. **Statistics Calculation**: Win rate percentages
5. **Visual Feedback**: Color-coded results
6. **Keyboard Controls**: Letter key shortcuts

### Skills Developed
- Complex conditional logic (if/else chains or switch)
- Math.random() for AI decisions
- LocalStorage for data persistence
- Percentage calculations
- Animation and visual feedback
- Keyboard event listeners

## 🔧 Implementation Explanation

### How It Works

**1. Computer Choice**
```javascript
choices = ['rock', 'paper', 'scissors']
computerChoice = choices[Math.floor(Math.random() * 3)]
```

**2. Determine Winner**
```javascript
if (player === computer) return 'tie'
if (player === 'rock' && computer === 'scissors') return 'win'
if (player === 'paper' && computer === 'rock') return 'win'
if (player === 'scissors' && computer === 'paper') return 'win'
return 'lose'
```

**3. Win Rate Calculation**
```javascript
winRate = (wins / totalGames) * 100
```

## 📖 Further Learning - W3Schools

- [JavaScript Math.random()](https://www.w3schools.com/js/js_random.asp)
- [JavaScript if...else](https://www.w3schools.com/js/js_if_else.asp)
- [JavaScript Switch](https://www.w3schools.com/js/js_switch.asp)
- [JavaScript LocalStorage](https://www.w3schools.com/html/html5_webstorage.asp)
- [JavaScript Keyboard Events](https://www.w3schools.com/jsref/obj_keyboardevent.asp)
- [CSS Animations](https://www.w3schools.com/css/css3_animations.asp)

## Features

- ✅ **Play against computer** - Random AI opponent
- ✅ **Score tracking** - Player, Computer, and Ties
- ✅ **Statistics**:
  - Total games played
  - Win rate percentage
- ✅ **Visual feedback** - Animated choices and results
- ✅ **LocalStorage** - Scores persist across sessions
- ✅ **Keyboard shortcuts** (R, P, S)
- ✅ **Responsive design**
- ✅ **Beautiful animations**
- ✅ **Color-coded results** (green=win, red=lose, blue=tie)

## How to Play

1. Click Rock (✊), Paper (✋), or Scissors (✌️)
2. Computer makes its choice
3. See who wins!
4. Scores update automatically
5. Reset anytime with the reset button

### Keyboard Shortcuts
- **R** - Rock
- **P** - Paper
- **S** - Scissors

## Game Rules

- **Rock** crushes Scissors (Rock wins)
- **Scissors** cuts Paper (Scissors wins)
- **Paper** covers Rock (Paper wins)
- Same choice = Tie

## Learning Points

### JavaScript Concepts

#### Random Selection
```javascript
const choices = ['rock', 'paper', 'scissors'];
const randomIndex = Math.floor(Math.random() * choices.length);
const computerChoice = choices[randomIndex];
```

#### Game Logic (Winner Determination)
```javascript
function determineWinner(player, computer) {
    if (player === computer) return 'tie';
    
    // Check all winning conditions
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
    ) {
        return 'player';
    }
    
    return 'computer';
}
```

#### Data Structures
```javascript
// Object for scores
const scores = {
    player: 0,
    computer: 0,
    tie: 0
};

// Object for emojis mapping
const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};
```

#### Percentage Calculation
```javascript
const winRate = (playerWins / totalGames) * 100;
const formatted = winRate.toFixed(1); // 1 decimal place
```

#### Animation Reset Trick
```javascript
// Remove animation
element.style.animation = 'none';

// Force reflow
setTimeout(() => {
    element.style.animation = 'pulse 0.5s ease';
}, 50);
```

### Math.random()

```javascript
Math.random()              // 0.0 to 0.999...
Math.random() * 3          // 0.0 to 2.999...
Math.floor(Math.random() * 3)  // 0, 1, or 2
```

### LocalStorage Usage

```javascript
// Save
localStorage.setItem('rpsScores', JSON.stringify(scores));

// Load
const saved = localStorage.getItem('rpsScores');
if (saved) {
    scores = JSON.parse(saved);
}
```

## Win Conditions

### Player Wins
- Rock vs Scissors
- Paper vs Rock
- Scissors vs Paper

### Computer Wins
- Rock vs Paper
- Paper vs Scissors
- Scissors vs Rock

### Tie
- Rock vs Rock
- Paper vs Paper
- Scissors vs Scissors

## Statistics Explained

### Games Played
Total of all games: `player wins + computer wins + ties`

### Win Rate
Percentage of games won by player:
```
(player wins / total games) × 100
```

## CSS Animations

- **fadeIn**: Choice icons appear
- **pulse**: Icons scale up/down
- **shake**: (Optional) For dramatic effect

## Color Coding

- **Win** (Green): `#c6f6d5` background
- **Lose** (Red): `#fed7d7` background
- **Tie** (Blue): `#bee3f8` background

## Data Persistence

All scores automatically save to localStorage:
- Player score
- Computer score
- Tie score

Survives:
- Page refresh
- Browser restart
- Days/weeks later

## Future Enhancement Ideas

- Best of 3/5/7 modes
- Difficulty levels (Easy, Hard)
- Sound effects
- More animations
- Rock-Paper-Scissors-Lizard-Spock variant
- Player vs Player mode
- Tournament mode
- Achievement system
- Leaderboard
- Game history log
- Streak tracking
- Custom themes
- Multiplayer online

