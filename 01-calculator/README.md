# Calculator

A beautiful, fully functional calculator with keyboard support.

## 🎯 Learning Objectives

By completing this project, you will:
- Understand DOM manipulation and event handling in JavaScript
- Learn to manage application state without frameworks
- Master CSS Grid for layout design
- Implement keyboard event listeners for accessibility
- Handle mathematical operations and edge cases (division by zero)
- Create responsive and interactive user interfaces

## 📚 What You'll Learn

### Core Concepts
1. **State Management**: Track current value, previous value, operation, and display flags
2. **Event Handling**: Mouse clicks and keyboard input events
3. **CSS Grid Layout**: Create a responsive calculator button grid
4. **Error Handling**: Prevent division by zero and invalid operations
5. **User Experience**: Visual feedback with hover effects and transitions

### Skills Developed
- DOM querying with `querySelector` and `querySelectorAll`
- Event delegation for efficient event handling
- String and number manipulation
- Conditional logic with switch statements
- Dataset API for storing element metadata

## 🔧 Implementation Explanation

### How It Works

**1. HTML Structure**
- The calculator uses a grid-based button layout
- Each button has `data-*` attributes to identify its type (number, operator, or action)
- A readonly input field displays the current value

**2. State Variables**
```javascript
currentValue: stores display value
previousValue: stores first operand
operation: stores selected operator (+, -, *, /, %)
shouldResetDisplay: flag to clear display on next input
```

**3. Event Flow**
- **Number Click**: Appends digit to display (unless shouldResetDisplay is true)
- **Operator Click**: Saves current value to previousValue, stores operator
- **Equals Click**: Performs calculation using previousValue, currentValue, and operation
- **Clear (AC)**: Resets all state variables
- **Delete (DEL)**: Removes last character using `slice()`

**4. Key Functions**
- `appendNumber()`: Adds digits to display, prevents multiple decimals
- `chooseOperation()`: Stores operator and handles chained calculations
- `calculate()`: Performs arithmetic based on stored operation
- `updateDisplay()`: Updates the visual display
- `handleKeyboard()`: Maps keyboard keys to calculator functions

**5. Error Prevention**
- Checks for division by zero before calculation
- Validates decimal point entry (only one per number)
- Handles empty inputs gracefully

## Features

- ✅ Basic arithmetic operations (+, -, ×, ÷, %)
- ✅ Clear (AC) and Delete (DEL) functions
- ✅ Decimal point support
- ✅ Keyboard support for all operations
- ✅ Responsive design
- ✅ Division by zero protection

## Keyboard Shortcuts

- `0-9`: Number input
- `.`: Decimal point
- `+, -, *, /`: Operations
- `%`: Modulo
- `Enter` or `=`: Calculate result
- `Escape`: Clear all
- `Backspace`: Delete last digit

## How to Use

1. Open `index.html` in your browser
2. Click buttons or use keyboard to input numbers and operations
3. Press `=` or `Enter` to calculate
4. Use `AC` to clear everything or `DEL` to remove the last digit

## 📖 Further Learning - W3Schools

- [JavaScript Math](https://www.w3schools.com/js/js_math.asp)
- [JavaScript Events](https://www.w3schools.com/js/js_events.asp)
- [JavaScript Switch Statement](https://www.w3schools.com/js/js_switch.asp)
- [JavaScript Data Attributes](https://www.w3schools.com/tags/att_data-.asp)
- [CSS Grid Layout](https://www.w3schools.com/css/css_grid.asp)
- [JavaScript Keyboard Events](https://www.w3schools.com/jsref/obj_keyboardevent.asp)
- [JavaScript parseFloat](https://www.w3schools.com/jsref/jsref_parsefloat.asp)

## Learning Points

### HTML Concepts
- **Semantic Structure**: Using `div` containers for organization
- **Data Attributes**: `data-action` and `data-operator` for storing button types
- **Input Attributes**: `readonly` attribute for display-only input
- **Button Elements**: Interactive elements with proper labeling
- **External Resources**: Linking CSS and JavaScript files

### CSS Concepts
- **CSS Grid Layout**: `.buttons { display: grid; grid-template-columns: repeat(4, 1fr); }`
  - Creates 4 equal columns for calculator buttons
  - `gap` property for spacing between items
- **CSS Variables**: Could use for theming (optional enhancement)
- **Flexbox**: Used in container for centering
- **Pseudo-classes**: `:hover` and `:active` for button interactions
- **CSS Transitions**: `transition: all 0.2s` for smooth animations
- **Linear Gradients**: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Box Shadow**: `box-shadow: 0 10px 50px rgba(0, 0, 0, 0.2)` for depth
- **Border Radius**: Rounded corners with `border-radius: 20px`
- **Grid Spanning**: `grid-column: span 2` for wider buttons (0, AC)
- **Responsive Units**: Using `rem` and `%` for scalability

### JavaScript Concepts
- **DOM Selection**:
  - `document.getElementById()` - Select by ID
  - `document.querySelector()` - Select first match
  - `document.querySelectorAll()` - Select all matches
- **Event Handling**:
  - `addEventListener('click', callback)` - Click events
  - `addEventListener('keydown', callback)` - Keyboard events
  - Event delegation for multiple buttons
- **State Management**:
  - `currentValue` - Tracks display value
  - `previousValue` - Stores first operand
  - `operation` - Stores selected operation
  - `shouldResetDisplay` - Boolean flag for behavior control
- **String Manipulation**:
  - `slice()` - Remove characters
  - `includes()` - Check for decimal point
  - `toString()` - Convert number to string
- **Number Operations**:
  - `parseFloat()` - Convert string to number
  - Basic arithmetic (+, -, *, /, %)
- **Conditionals**:
  - `if/else` statements for logic
  - `switch` statement for operation selection
- **Array Methods**:
  - `forEach()` - Iterate through button collections
- **Dataset API**: `button.dataset.number` - Access data attributes
- **Template Literals**: Could be used for display formatting
- **Functions**: Modular code organization
- **Error Handling**: Division by zero check with `alert()`

