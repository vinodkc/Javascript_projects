## Project 18: 🧠 Memory Card Game

A classic memory matching game with multiple difficulty levels, themes, and a leaderboard!

## 🎯 Learning Objectives

By completing this project, you will:
- Master the Fisher-Yates shuffle algorithm
- Learn card flip animations with CSS 3D transforms
- Understand game state management (flipped, matched cards)
- Implement timer functionality
- Work with array duplication and shuffling
- Create leaderboard systems with sorting

## 📚 What You'll Learn

### Core Concepts
1. **Fisher-Yates Shuffle**: Randomize array efficiently
2. **3D CSS Transforms**: Card flip animations
3. **Game State Management**: Track flipped and matched cards
4. **Timer Logic**: Track elapsed time
5. **Array Operations**: Duplicate, shuffle, compare
6. **Leaderboard Sorting**: Sort by time, limit top 10

### Skills Developed
- Fisher-Yates shuffle implementation
- CSS transform: rotateY(180deg)
- Card flip timing with setTimeout()
- Matching logic (compare two cards)
- Star rating based on moves/time
- LocalStorage for leaderboard

## 🔧 Implementation Explanation

### How It Works

**1. Fisher-Yates Shuffle**
```javascript
for (let i = array.length - 1; i > 0; i--) {
  j = Math.floor(Math.random() * (i + 1))
  [array[i], array[j]] = [array[j], array[i]]  // Swap
}
```

**2. Card Flip Logic**
```javascript
If first card: Store it
If second card: 
  Compare with first
  If match: Keep flipped
  If no match: Flip both back after delay
```

**3. Timer**
```javascript
setInterval(() => { seconds++ }, 1000)
```

**4. Leaderboard Sorting**
```javascript
leaderboard.sort((a, b) => a.time - b.time).slice(0, 10)
```

## 📖 Further Learning - W3Schools

- [JavaScript Array sort()](https://www.w3schools.com/js/js_array_sort.asp)
- [JavaScript setTimeout()](https://www.w3schools.com/jsref/met_win_settimeout.asp)
- [JavaScript Array slice()](https://www.w3schools.com/jsref/jsref_slice_array.asp)
- [CSS 3D Transforms](https://www.w3schools.com/css/css3_3dtransforms.asp)
- [CSS transform](https://www.w3schools.com/cssref/css3_pr_transform.php)
- [JavaScript Destructuring](https://www.w3schools.com/react/react_es6_destructuring.asp)

### ✨ Features

- **4 Difficulty Levels**: Easy (6 pairs), Medium (8 pairs), Hard (10 pairs), Expert (12 pairs)
- **4 Themes**: Emojis, Animals, Fruits, Numbers
- **Timer**: Track how long it takes to complete
- **Move Counter**: Count attempts and calculate accuracy
- **Pause/Resume**: Take breaks during gameplay
- **Leaderboard**: Save top 10 best times with localStorage
- **3D Card Flips**: Smooth CSS animations
- **Star Rating**: Earn stars based on efficiency
- **Responsive Design**: Works on all devices

### 🎮 How to Play

1. **Choose Settings**: Select difficulty and theme
2. **Start Game**: Click cards to flip and reveal
3. **Match Pairs**: Find matching cards
4. **Complete**: Match all pairs to win!

### 📚 Key Concepts - Fisher-Yates Shuffle Algorithm

**The Shuffle Algorithm:**
```javascript
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
```

**Step-by-Step Example:**
```
Original: [🍎, 🍊, 🍋, 🍌]

i=3: j=random(0-3)=1 → Swap index 3 and 1
     [🍎, 🍌, 🍋, 🍊]

i=2: j=random(0-2)=0 → Swap index 2 and 0
     [🍋, 🍌, 🍎, 🍊]

i=1: j=random(0-1)=1 → Swap index 1 and 1 (no change)
     [🍋, 🍌, 🍎, 🍊]

Result: [🍋, 🍌, 🍎, 🍊] ✓ Shuffled!
```

**Why Fisher-Yates?**
- ✅ Perfect randomness (unbiased)
- ✅ O(n) time complexity
- ✅ In-place shuffling
- ✅ Industry standard

### 📚 CSS 3D Card Flip Animation

**The Magic:**
```css
.card-inner {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.card.flipped .card-inner {
    transform: rotateY(180deg);
}

.card-front, .card-back {
    backface-visibility: hidden;
}

.card-back {
    transform: rotateY(180deg);
}
```

**How It Works:**
1. `preserve-3d`: Enables 3D space
2. `rotateY(180deg)`: Flips card on Y-axis
3. `backface-visibility: hidden`: Hides back side when facing away
4. Back starts rotated 180°, becomes visible when card flips

### 🎯 Learning Outcomes

✅ Fisher-Yates shuffle algorithm
✅ 3D CSS transforms
✅ Game state management
✅ Timer implementation
✅ LocalStorage leaderboard
✅ Card matching logic
✅ Accuracy calculation
✅ Responsive grid layouts

---

**Built for learning JavaScript algorithms and CSS animations! 🧠🚀**
