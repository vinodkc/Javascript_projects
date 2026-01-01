## Project 17: 🎯 Number Guessing Game

A fun and interactive number guessing game with multiple difficulty levels, hints, temperature feedback, and statistics tracking!

## 🎯 Learning Objectives

By completing this project, you will:
- Master random number generation within ranges
- Learn distance calculation for proximity feedback
- Understand hint systems and scoring penalties
- Implement difficulty levels with range configurations
- Work with guess history and validation
- Create temperature-based visual feedback

## 📚 What You'll Learn

### Core Concepts
1. **Random Number Generation**: Generate within specific ranges
2. **Distance Calculation**: How close guesses are to target
3. **Hint System**: Multiple hint types with costs
4. **Score Calculation**: Points based on performance
5. **Difficulty Levels**: Different ranges and attempt limits
6. **Statistics Tracking**: Win rate, best score, games played

### Skills Developed
- Math.floor(Math.random() * (max - min + 1)) + min
- Absolute value for distance: Math.abs(guess - target)
- Array push for history tracking
- Conditional scoring with penalties
- Input validation and range checking
- Persistent statistics with localStorage

## 🔧 Implementation Explanation

### How It Works

**1. Random Number Generation**
```javascript
target = Math.floor(Math.random() * (max - min + 1)) + min
// Easy: 1-50, Medium: 1-100, Hard: 1-500, Expert: 1-1000
```

**2. Distance Calculation**
```javascript
distance = Math.abs(guess - target)
percentage = (distance / range) * 100
// Categorize: Ice Cold, Cold, Warm, Hot, On Fire!
```

**3. Score Calculation**
```javascript
score = baseScore - (attempts * penalty) - (hintsUsed * 10)
```

**4. Hint Types**
- Even/Odd check
- Range position (first/last half)
- Divisibility hints

## 📖 Further Learning - W3Schools

- [JavaScript Math.random()](https://www.w3schools.com/js/js_random.asp)
- [JavaScript Math.abs()](https://www.w3schools.com/jsref/jsref_abs.asp)
- [JavaScript Array push()](https://www.w3schools.com/jsref/jsref_push.asp)
- [HTML Input Validation](https://www.w3schools.com/html/html_form_attributes.asp)
- [JavaScript Modulo Operator](https://www.w3schools.com/js/js_arithmetic.asp)
- [JavaScript LocalStorage](https://www.w3schools.com/html/html5_webstorage.asp)

### ✨ Features

- **Multiple Difficulty Levels**: Easy (1-50), Medium (1-100), Hard (1-500), Expert (1-1000)
- **Configurable Attempts**: Choose from 5, 7, 10, 15 attempts or unlimited
- **Smart Hints**: Get clues about even/odd, range position, divisibility (costs 10 points each)
- **Temperature Feedback**: Visual indicator showing how close you are (Ice Cold → On Fire!)
- **Guess History**: Track all your guesses with distance indicators
- **Score System**: Earn points based on accuracy and attempts remaining
- **Statistics**: Persistent stats tracking games played, won, win rate, and best score
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop

### 🎮 How to Play

1. **Select Settings**: Choose difficulty and max attempts
2. **Start Game**: Click "Start New Game"
3. **Make Guesses**: Enter a number and click "Guess!"
4. **Use Hints**: Get helpful clues (costs points)
5. **Win or Lose**: Guess correctly before running out of attempts!

### 📚 Concepts Covered

#### HTML Concepts

**1. Form Inputs**
```html
<input type="number" id="guessInput" min="1" max="100">
<select id="difficulty">
    <option value="easy">Easy (1-50)</option>
</select>
```
- `type="number"`: Number input with spinners
- `min`/`max`: Input validation attributes
- `<select>` and `<option>`: Dropdown menus

**2. Modal Dialog**
```html
<div class="modal" id="gameOverModal">
    <div class="modal-content">
        <!-- Modal content -->
    </div>
</div>
```
- Overlay for game over screen
- Flexbox centering for modal positioning

**3. Progress Bar**
```html
<div class="progress-container">
    <div class="progress-bar" id="progressBar"></div>
</div>
```
- Dynamic width updates via JavaScript
- Visual feedback for attempts used

#### CSS Concepts

**1. CSS Grid for Layouts**
```css
.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
```
- `auto-fit`: Automatically adjusts columns
- `minmax()`: Responsive column sizing
- `gap`: Spacing between grid items

**2. Flexbox for Alignment**
```css
.input-section {
    display: flex;
    gap: 10px;
}

#guessInput {
    flex: 1;  /* Take remaining space */
}
```

**3. Dynamic Progress Bar**
```css
.progress-bar {
    width: 0%;  /* Updated by JavaScript */
    transition: width 0.3s ease, background 0.3s ease;
}
```
- Width changes smoothly with CSS transitions
- Background color changes based on percentage

**4. Modal Overlay**
```css
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: none;  /* Hidden by default */
}

.modal.show {
    opacity: 1;  /* Show with fade-in */
}
```

**5. Animations**
```css
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.feedback.pulse {
    animation: pulse 0.5s;
}
```

**6. Hover Effects**
```css
.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}
```

#### JavaScript Concepts

**1. Math.random() for Random Numbers**

```javascript
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

**How it works:**
- `Math.random()`: Returns 0 ≤ x < 1
- Multiply by range: `(max - min + 1)`
- Add minimum: `+ min`
- Floor: Convert to integer

**Examples:**
```javascript
// Range 1-100
Math.random()           // 0.7342...
× (100 - 1 + 1)        // 0.7342... × 100 = 73.42...
+ 1                     // 74.42...
Math.floor()            // 74 ✓

// Range 1-50
Math.random()           // 0.2518...
× (50 - 1 + 1)         // 0.2518... × 50 = 12.59...
+ 1                     // 13.59...
Math.floor()            // 13 ✓
```

**2. Game State Management**

```javascript
let gameState = {
    secretNumber: 42,
    minRange: 1,
    maxRange: 100,
    maxAttempts: 10,
    attemptsUsed: 3,
    guesses: [25, 60, 42],
    score: 85,
    hintsUsed: 1,
    isGameActive: true,
    difficulty: 'medium'
};
```

**Why use an object?**
- Centralized state
- Easy to pass around
- Clear structure
- Easy to reset

**3. Input Validation**

```javascript
function makeGuess() {
    const guess = parseInt(guessInput.value);
    
    // Check if valid number
    if (isNaN(guess)) {
        showFeedback('Please enter a valid number!', 'error');
        return;
    }
    
    // Check range
    if (guess < gameState.minRange || guess > gameState.maxRange) {
        showFeedback(`Please enter a number between ${gameState.minRange} and ${gameState.maxRange}!`, 'error');
        return;
    }
    
    // Check duplicates
    if (gameState.guesses.includes(guess)) {
        showFeedback('You already guessed that number!', 'warning');
        return;
    }
    
    // Process valid guess
    processGuess(guess);
}
```

**Validation Steps:**
1. **Type Check**: `isNaN()` ensures it's a number
2. **Range Check**: Within min/max bounds
3. **Duplicate Check**: `Array.includes()` checks if already guessed
4. **Early Return**: Stop execution if invalid

**4. Distance Calculation**

```javascript
// Calculate how far the guess is from secret number
const distance = Math.abs(guess - gameState.secretNumber);

// Convert to percentage of total range
const range = gameState.maxRange - gameState.minRange;
const percentage = (distance / range) * 100;
```

**Example:**
```javascript
// Secret: 42, Range: 1-100, Guess: 75
distance = Math.abs(75 - 42) = 33
range = 100 - 1 = 99
percentage = (33 / 99) × 100 = 33.33%
```

**5. Temperature Feedback Algorithm**

```javascript
function updateTemperature(distancePercentage) {
    let index;
    if (distancePercentage > 50) {
        index = 0; // Ice cold (>50% away)
    } else if (distancePercentage > 30) {
        index = 1; // Cold (30-50% away)
    } else if (distancePercentage > 15) {
        index = 2; // Warm (15-30% away)
    } else if (distancePercentage > 5) {
        index = 3; // Hot (5-15% away)
    } else {
        index = 4; // On fire! (<5% away)
    }
    
    tempItems[index].classList.add('active');
}
```

**Temperature Zones:**
| Distance | Feedback | Example (1-100) |
|----------|----------|----------------|
| > 50% | 🧊 Ice Cold | >50 away |
| 30-50% | ❄️ Cold | 30-50 away |
| 15-30% | 🌡️ Warm | 15-30 away |
| 5-15% | 🔥 Hot | 5-15 away |
| < 5% | 💥 On Fire! | <5 away |

**6. Dynamic Hint System**

```javascript
function getHint() {
    gameState.hintsUsed++;
    gameState.score -= 10;  // Penalty
    
    const secret = gameState.secretNumber;
    let hint = '';
    
    if (gameState.hintsUsed === 1) {
        // First hint: Even/Odd
        hint = secret % 2 === 0 ? 'The number is EVEN' : 'The number is ODD';
    } else if (gameState.hintsUsed === 2) {
        // Second hint: Upper/Lower half
        const mid = Math.floor((gameState.minRange + gameState.maxRange) / 2);
        hint = secret > mid 
            ? `The number is greater than ${mid}` 
            : `The number is less than or equal to ${mid}`;
    } else if (gameState.hintsUsed === 3) {
        // Third hint: Divisibility by 5
        hint = secret % 5 === 0 
            ? 'The number is divisible by 5' 
            : 'The number is NOT divisible by 5';
    } else {
        // Fourth+ hint: Quarter of range
        const range = Math.floor((gameState.maxRange - gameState.minRange) / 4);
        const quarter = Math.floor(secret / range);
        hint = `The number is in the ${['first', 'second', 'third', 'fourth'][quarter]} quarter`;
    }
    
    hintText.textContent = hint;
    hintContainer.style.display = 'block';
}
```

**7. Score Calculation**

```javascript
// Base score depends on difficulty
const baseScore = {
    easy: 50,
    medium: 100,
    hard: 500,
    expert: 1000
}[gameState.difficulty];

// Deduct points per guess based on distance
const pointsLost = Math.ceil(distance / 10);
gameState.score = Math.max(0, gameState.score - pointsLost);

// Bonus for winning with attempts remaining
const attemptBonus = (gameState.maxAttempts - gameState.attemptsUsed) * 10;
const finalScore = gameState.score + attemptBonus;
```

**Example Score Calculation:**
```
Difficulty: Medium (base 100 points)
Secret: 42, Guesses: [25, 60, 50, 42]

Guess 1: 25 → distance 17 → lose 2 points (98 left)
Guess 2: 60 → distance 18 → lose 2 points (96 left)
Guess 3: 50 → distance 8 → lose 1 point (95 left)
Guess 4: 42 → CORRECT! (95 points)

Max attempts: 10, Used: 4
Attempt bonus: (10 - 4) × 10 = 60 points
Final score: 95 + 60 = 155 points! 🎉
```

**8. LocalStorage for Statistics**

```javascript
// Save stats
function saveStats() {
    localStorage.setItem('numberGuessingStats', JSON.stringify(stats));
}

// Load stats
function loadStats() {
    const saved = localStorage.getItem('numberGuessingStats');
    if (saved) {
        stats = JSON.parse(saved);
    }
}

// Update stats
stats.gamesPlayed++;
if (won) {
    stats.gamesWon++;
    if (finalScore > stats.bestScore) {
        stats.bestScore = finalScore;
    }
}
saveStats();
```

**9. Array Methods**

```javascript
// Add guess to history
gameState.guesses.push(guess);

// Check if already guessed
if (gameState.guesses.includes(guess)) {
    // Duplicate!
}

// Get last guess
const lastGuess = gameState.guesses[gameState.guesses.length - 1];

// Clear history
gameState.guesses = [];
```

**10. DOM Manipulation**

```javascript
function addToHistory(guess) {
    const guessItem = document.createElement('div');
    guessItem.className = 'guess-item';
    
    const distance = Math.abs(guess - gameState.secretNumber);
    let indicator = guess < gameState.secretNumber ? '↑' : '↓';
    
    guessItem.innerHTML = `
        <span class="guess-number">${guess}</span>
        <span class="guess-indicator">${indicator}</span>
        <span class="guess-distance">${distance} away</span>
    `;
    
    // Insert at top (newest first)
    guessHistory.insertBefore(guessItem, guessHistory.firstChild);
}
```

**11. Modal Control**

```javascript
function showModal() {
    gameOverModal.style.display = 'flex';
    setTimeout(() => {
        gameOverModal.classList.add('show');  // Trigger CSS transition
    }, 10);
}

function closeModal() {
    gameOverModal.classList.remove('show');
    setTimeout(() => {
        gameOverModal.style.display = 'none';
    }, 300);  // Wait for animation
}
```

**12. Event Handling**

```javascript
// Button click
guessBtn.addEventListener('click', makeGuess);

// Enter key in input
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        makeGuess();
    }
});

// Modal outside click
gameOverModal.addEventListener('click', (e) => {
    if (e.target === gameOverModal) {
        closeModal();  // Click on backdrop
    }
});
```

**13. Conditional Classes**

```javascript
// Add class based on condition
if (guess < gameState.secretNumber) {
    guessItem.classList.add('too-low');
} else if (guess > gameState.secretNumber) {
    guessItem.classList.add('too-high');
} else {
    guessItem.classList.add('correct');
}
```

### 🎮 Game Algorithm Flow

```
1. Initialize Game
   ├─ Load saved statistics
   ├─ Show settings panel
   └─ Attach event listeners

2. Start New Game
   ├─ Get difficulty settings
   ├─ Generate random secret number
   ├─ Reset game state
   └─ Show game area

3. Process Guess
   ├─ Validate input
   │   ├─ Check if number
   │   ├─ Check range
   │   └─ Check duplicates
   ├─ Calculate distance
   ├─ Update temperature
   ├─ Deduct points
   ├─ Add to history
   └─ Check win/loss condition

4. Win/Loss
   ├─ Update statistics
   ├─ Calculate final score
   ├─ Show modal
   └─ Save to localStorage

5. Play Again
   └─ Go to step 2
```

### 🧮 Mathematical Concepts

**1. Modulo Operator (%) for Even/Odd**
```javascript
42 % 2 === 0  // Even → true
43 % 2 === 0  // Odd → false
```

**2. Distance Formula**
```javascript
distance = |guess - secret|

Examples:
|75 - 42| = 33
|10 - 42| = 32
|42 - 42| = 0 ✓
```

**3. Percentage Calculation**
```javascript
percentage = (part / whole) × 100

Example:
Distance: 33
Range: 99
Percentage: (33 / 99) × 100 = 33.33%
```

**4. Win Rate Calculation**
```javascript
winRate = (gamesWon / gamesPlayed) × 100

Example:
Played: 20 games
Won: 15 games
Win Rate: (15 / 20) × 100 = 75%
```

### 🎯 Strategy Tips

**Optimal Guessing Strategy:**

1. **Binary Search** (Most Efficient)
   - Start with middle: 50 (for 1-100)
   - If too high → try 25
   - If too low → try 75
   - Continue halving the range

**Example:**
```
Range: 1-100, Secret: 73

Guess 1: 50 → Too low
Guess 2: 75 → Too high
Guess 3: 62 → Too low
Guess 4: 68 → Too low
Guess 5: 71 → Too low
Guess 6: 73 → CORRECT! ✓

Maximum guesses needed: log₂(100) ≈ 7 guesses
```

2. **Use Hints Strategically**
   - Use hints when down to 2-3 attempts
   - Even/odd hint eliminates 50% of possibilities
   - Upper/lower half hint narrows range significantly

3. **Temperature Feedback**
   - "On Fire" means within 5% of range
   - For 1-100: within 5 numbers!
   - Narrow your search aggressively

### 🚀 Possible Enhancements

1. **Multiplayer Mode**: Two players take turns guessing
2. **Time Limit**: Add countdown timer for extra challenge
3. **Leaderboard**: Online high score board
4. **Sound Effects**: Audio feedback for guesses
5. **Difficulty Modifiers**: Prime numbers only, multiples of 3, etc.
6. **Achievement System**: Badges for milestones
7. **Streak Tracking**: Consecutive wins bonus
8. **Custom Range**: Let user set min/max values

### 🐛 Common Issues & Solutions

**Issue**: Input accepts decimals
**Solution**: Use `type="number"` with `step="1"` or `parseInt()`

**Issue**: Can guess same number twice
**Solution**: Check `gameState.guesses.includes(guess)`

**Issue**: Score goes negative
**Solution**: Use `Math.max(0, score - penalty)`

**Issue**: Modal doesn't close on backdrop click
**Solution**: Check `e.target === gameOverModal` (not children)

### 📊 Code Statistics

- **HTML**: 200+ lines
- **CSS**: 600+ lines  
- **JavaScript**: 450+ lines
- **Total**: 1,250+ lines of code!

### 🎓 Learning Outcomes

After completing this project, you'll understand:

✅ Random number generation
✅ Input validation
✅ Game state management
✅ Scoring algorithms
✅ LocalStorage persistence
✅ Modal dialogs
✅ Dynamic UI updates
✅ Array manipulation
✅ Mathematical calculations
✅ Event handling
✅ CSS animations
✅ Responsive design

---

**Have fun playing and learning! 🎯🚀**

