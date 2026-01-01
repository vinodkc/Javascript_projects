# Quiz App

An interactive multiple-choice quiz application with scoring, progress tracking, and answer review.

## 🎯 Learning Objectives

By completing this project, you will:
- Master complex state management (current question, score, answers)
- Learn to work with structured data (arrays of objects)
- Understand screen navigation and UI state changes
- Implement progress tracking and scoring systems
- Create dynamic DOM elements based on data
- Work with delayed execution for visual feedback

## 📚 What You'll Learn

### Core Concepts
1. **State Management**: Tracking quiz progress, score, and user answers
2. **Data Structures**: Array of objects for quiz questions
3. **Screen Navigation**: Multiple views (start, quiz, results, review)
4. **Dynamic DOM Creation**: Building UI from data
5. **Progress Tracking**: Calculating and displaying completion percentage
6. **Score Calculation**: Percentage-based evaluation

### Skills Developed
- Complex data structure management (quiz questions array)
- Dynamic button/option creation with forEach()
- classList manipulation for visual feedback
- setTimeout() for delayed transitions
- Progress bar updates
- Percentage calculations
- Multi-screen application flow
- Answer validation and review system

## 🔧 Implementation Explanation

### How It Works

**1. Quiz Data Structure**
```javascript
{
  question: "Question text?",
  options: ["A", "B", "C", "D"],
  correct: 0  // index of correct answer
}
```

**2. State Variables**
```javascript
currentQuestion: current question index
score: number of correct answers
userAnswers: array storing user selections
```

**3. Quiz Flow**
```
Start Screen → Question Loop → Answer Selection → 
Next Question → Results Screen → Review Screen
```

**4. Question Display**
- Clear previous options
- Create button for each option
- Add click event listeners
- Show question text and number

**5. Answer Validation**
```javascript
if (selectedIndex === correct) {
  score++
  button.classList.add('correct')  // green
} else {
  button.classList.add('incorrect')  // red
  showCorrectAnswer()
}
```

**6. Progress Calculation**
```javascript
progress = (currentQuestion / totalQuestions) * 100
```

**7. Performance Rating**
- 80%+: Excellent
- 60-79%: Good
- <60%: Keep Learning

**8. Review System**
- Displays all questions
- Shows user's answer vs correct answer
- Color codes results

## Features

- ✅ **Multiple screens**:
  - Start screen with quiz information
  - Quiz screen with questions
  - Result screen with score
  - Review screen with answer breakdown
- ✅ **10 JavaScript questions** (easily customizable)
- ✅ **Progress bar** showing quiz completion
- ✅ **Real-time scoring**
- ✅ **Visual feedback** for correct/incorrect answers
- ✅ **Answer validation** with color coding
- ✅ **Final score** with percentage
- ✅ **Performance rating** based on score
- ✅ **Answer review** showing all questions and answers
- ✅ **Restart functionality**
- ✅ **Smooth transitions** and animations
- ✅ **Responsive design**

## 📖 Further Learning - W3Schools

- [JavaScript Arrays](https://www.w3schools.com/js/js_arrays.asp)
- [JavaScript Objects](https://www.w3schools.com/js/js_objects.asp)
- [JavaScript Array forEach()](https://www.w3schools.com/jsref/jsref_foreach.asp)
- [JavaScript createElement()](https://www.w3schools.com/jsref/met_document_createelement.asp)
- [JavaScript classList](https://www.w3schools.com/jsref/prop_element_classlist.asp)
- [JavaScript setTimeout()](https://www.w3schools.com/jsref/met_win_settimeout.asp)
- [JavaScript Template Literals](https://www.w3schools.com/js/js_string_templates.asp)

## How to Use

1. Open `index.html` in your browser
2. Click "Start Quiz" to begin
3. Read each question carefully
4. Click on your answer choice
5. View immediate feedback (green = correct, red = incorrect)
6. Click "Next Question" to continue
7. Complete all 10 questions
8. View your final score and performance rating
9. Click "Review Answers" to see all questions
10. Click "Try Again" to restart the quiz

## Learning Points

### JavaScript Concepts
- **Data structures**: Array of objects for quiz questions
- **State management**: Tracking current question, score, user answers
- **Array methods**:
  - `forEach()` - Iterate through questions/options
  - `push()` - Store user answers
- **DOM manipulation**:
  - `createElement()` - Create option buttons
  - `appendChild()` - Add elements to page
  - `classList` - Add/remove CSS classes
  - `innerHTML` - Clear and populate containers
- **Event handling**: Click events on buttons
- **Conditional logic**: Answer validation, scoring
- **Screen navigation**: Show/hide different sections
- **Progress calculation**: Percentage completion
- **Delayed execution**: `setTimeout()` for visual feedback
- **Template literals**: Dynamic content generation

### Quiz Data Structure

```javascript
{
    question: "Question text here?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: 0  // Index of correct answer (0-3)
}
```

### Scoring System
- **Excellent**: 80%+ (8-10 correct)
- **Good**: 60-79% (6-7 correct)
- **Keep Learning**: Below 60% (0-5 correct)

## Customization

### Adding/Modifying Questions

Edit the `quizData` array in `script.js`:

```javascript
const quizData = [
    {
        question: "Your question here?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: 0  // Index of correct answer
    },
    // Add more questions...
];
```

### Changing Quiz Length
Simply add or remove question objects from the `quizData` array. The app automatically adjusts to any number of questions.

### Modifying Scoring Thresholds
Edit the percentage checks in the `showResults()` function:
```javascript
if (percentage >= 80) {  // Change this value
    // Excellent rating
}
```

## Features Breakdown

### Visual Feedback
- **Progress bar**: Shows quiz completion percentage
- **Color coding**: Green for correct, red for incorrect
- **Icons**: Emojis for different score ranges
- **Animations**: Smooth transitions between screens

### Answer Review
- Shows all questions with user's answers
- Highlights correct and incorrect answers
- Compare user's answer with correct answer
- Easy navigation back to results

## Future Enhancement Ideas

- Timer/countdown for each question
- Multiple quiz categories
- Difficulty levels (Easy, Medium, Hard)
- Leaderboard with high scores
- Save progress to localStorage
- Random question order
- Question shuffle
- Hints or lifelines
- Explanation for answers
- Sound effects
- Share results on social media
- Certificate generation
- Multi-player mode
- API integration for dynamic questions

