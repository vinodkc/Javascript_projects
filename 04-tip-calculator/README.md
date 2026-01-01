# Tip & Bill Splitter Calculator

A beautiful and intuitive calculator to compute tips and split bills among multiple people. Perfect for restaurants, group outings, and shared expenses!

## 🎯 Learning Objectives

By completing this project, you will:
- Master real-time input handling with the `input` event
- Learn event delegation patterns for efficient button handling
- Understand mathematical calculations and percentage operations
- Work with number formatting and currency display
- Implement data attributes for storing element metadata
- Create intuitive UIs with visual feedback and state management

## 📚 What You'll Learn

### Core Concepts
1. **Real-Time Calculations**: Update results instantly as users type
2. **Event Delegation**: Handle multiple button clicks with one listener
3. **Data Attributes**: Store and retrieve data from HTML elements
4. **Number Parsing**: Safely convert strings to numbers with fallbacks
5. **Currency Formatting**: Display money values consistently with `toFixed(2)`
6. **State Management**: Track active buttons and form values

### Skills Developed
- Input validation with safe defaults (`parseFloat() || 0`)
- CSS Grid for responsive button layouts
- Active state management with CSS classes
- Mathematical operations (percentages, division)
- Keyboard shortcuts for accessibility
- User experience best practices (focus management, reset functionality)

## 🔧 Implementation Explanation

### How It Works

**1. Input Structure**
- Bill amount (decimal number with step 0.01)
- Tip percentage (quick buttons or custom input)
- Number of people (integer, minimum 1)

**2. Real-Time Calculation Flow**
```
User Input → Parse Values → Validate → Calculate → Format → Display
```

**3. Tip Calculation Formula**
```javascript
tipAmount = billAmount × (tipPercent / 100)
totalAmount = billAmount + tipAmount
amountPerPerson = totalAmount / numberOfPeople
```

**4. Event Delegation for Tip Buttons**
- Single listener on parent container
- Checks if clicked element is a tip button
- Reads `data-tip` attribute value
- Updates active state visually
- Triggers calculation

**5. Safe Number Parsing**
```javascript
const billAmount = parseFloat(input.value) || 0;
const numPeople = parseInt(input.value) || 1;
```
- `parseFloat()` converts string to decimal
- `|| 0` provides fallback if empty or invalid
- `|| 1` for people count (prevent division by zero)

**6. Currency Formatting**
```javascript
`$${amount.toFixed(2)}`  // Always shows 2 decimals
```

**7. Visual State Management**
- Remove `active` class from all buttons
- Add `active` class to selected button
- Sync custom input with button selection

## 🎯 Features

- ✅ Calculate tip amount based on bill total
- ✅ Quick tip selection buttons (5%, 10%, 15%, 20%, 25%)
- ✅ Custom tip percentage input
- ✅ Split bills among multiple people
- ✅ Real-time calculation as you type
- ✅ Clear display of:
  - Tip amount
  - Total amount (bill + tip)
  - Amount per person
- ✅ Reset button to clear all inputs
- ✅ Currency formatting ($0.00)
- ✅ Responsive design
- ✅ Beautiful gradient UI with smooth animations

## 📖 Further Learning - W3Schools

- [JavaScript parseFloat()](https://www.w3schools.com/jsref/jsref_parsefloat.asp)
- [JavaScript parseInt()](https://www.w3schools.com/jsref/jsref_parseint.asp)
- [JavaScript toFixed()](https://www.w3schools.com/jsref/jsref_tofixed.asp)
- [JavaScript Input Events](https://www.w3schools.com/jsref/event_oninput.asp)
- [JavaScript Data Attributes](https://www.w3schools.com/tags/att_data-.asp)
- [CSS Grid Layout](https://www.w3schools.com/css/css_grid.asp)
- [HTML Input Types](https://www.w3schools.com/html/html_form_input_types.asp)

## 🚀 How to Use

1. Open `index.html` in your browser
2. Enter the bill amount in dollars
3. Select a tip percentage:
   - Click a quick button (5%, 10%, 15%, 20%, 25%)
   - OR enter a custom percentage
4. Enter the number of people splitting the bill
5. View the calculated results in real-time:
   - **Tip amount**: How much to tip
   - **Total with tip**: Bill + tip
   - **Amount per person**: What each person pays
6. Click "Reset" to clear all fields and start over

## 📚 Concepts & Learning Points

### HTML Concepts Used

#### 1. Semantic Structure
```html
<div class="container">
    <div class="input-section">
        <!-- Input fields grouped logically -->
    </div>
    <div class="tip-buttons">
        <!-- Quick selection buttons -->
    </div>
    <div class="result-section">
        <!-- Calculation results -->
    </div>
</div>
```
**Why**: Logical grouping makes code more maintainable and CSS styling easier.

#### 2. Input Types and Attributes
```html
<input type="number" id="billAmount" placeholder="0.00" step="0.01" min="0">
<input type="number" id="customTip" placeholder="Custom %" min="0" max="100">
<input type="number" id="numPeople" value="1" min="1" max="100">
```
**Attributes explained:**
- `type="number"`: Shows numeric keyboard on mobile, prevents non-numeric input
- `placeholder`: Hint text that disappears when typing
- `step="0.01"`: Allows cents (e.g., 25.50)
- `min`/`max`: Validation constraints
- `value="1"`: Default starting value

#### 3. Data Attributes for Dynamic Values
```html
<button class="tip-btn" data-tip="15">15%</button>
<button class="tip-btn" data-tip="20">20%</button>
```
**Why**: Store data directly in HTML, access easily in JavaScript with `element.dataset.tip`

### CSS Concepts Used

#### 1. CSS Grid for Button Layout
```css
.tip-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
    gap: 10px;
}

@media (max-width: 600px) {
    .tip-buttons {
        grid-template-columns: repeat(2, 1fr);  /* 2 columns on mobile */
    }
}
```
**Concept**: `grid-template-columns: repeat(3, 1fr)` creates 3 equal-width columns
**Result**: Buttons automatically align in a grid, responsive to screen size

#### 2. Active State with Transitions
```css
.tip-btn {
    background: white;
    border: 2px solid #ddd;
    transition: all 0.3s ease;  /* Smooth animation */
}

.tip-btn.active {
    background: #667eea;
    color: white;
    transform: scale(1.05);  /* Slightly larger */
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.tip-btn:hover {
    border-color: #667eea;
    transform: translateY(-2px);  /* Lift effect */
}
```
**Transitions**: Smooth changes between states (color, size, position)
**Transform**: Visual effects without affecting layout
- `scale(1.05)`: Makes button 5% larger
- `translateY(-2px)`: Moves button up 2 pixels

#### 3. Flexbox for Results Layout
```css
.result-item {
    display: flex;
    justify-content: space-between;  /* Space label and value apart */
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
}
```
**Why**: Flexbox easily aligns items horizontally with space distribution

#### 4. Number Formatting Display
```css
.result-value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #667eea;
    font-variant-numeric: tabular-nums;  /* Equal-width numbers */
}
```
**`font-variant-numeric: tabular-nums`**: Numbers don't shift as values change (e.g., $1.00 → $10.00)

### JavaScript Concepts Used

#### 1. Real-Time Input Handling
```javascript
// Listen for input changes on all calculation fields
billInput.addEventListener('input', calculateTip);
customTipInput.addEventListener('input', calculateTip);
numPeopleInput.addEventListener('input', calculateTip);
```
**Concept**: `input` event fires every time the value changes (while typing)
**Alternative**: `change` event only fires when input loses focus (on blur)
**Why `input` is better here**: Immediate feedback as user types

#### 2. Event Delegation for Buttons
```javascript
// Instead of adding listener to each button individually
tipButtonsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('tip-btn')) {
        // Get tip value from data attribute
        const tipValue = parseFloat(e.target.dataset.tip);
        
        // Remove active class from all buttons
        document.querySelectorAll('.tip-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Set custom tip input
        customTipInput.value = tipValue;
        
        // Calculate
        calculateTip();
    }
});
```
**Event Delegation Benefits:**
- Only 1 event listener for all buttons (better performance)
- Works automatically for dynamically added buttons
- Cleaner code

**Key techniques:**
- `e.target`: The exact element clicked
- `e.target.dataset.tip`: Access data-tip attribute value
- `classList.remove('active')`: Remove class from all buttons
- `classList.add('active')`: Add class to current button

#### 3. Robust Input Parsing with Fallbacks
```javascript
function calculateTip() {
    // Parse inputs with fallback to 0 if empty/invalid
    const billAmount = parseFloat(billInput.value) || 0;
    const tipPercent = parseFloat(customTipInput.value) || 0;
    const numPeople = parseInt(numPeopleInput.value) || 1;  // Default to 1
    
    // Prevent division by zero
    if (numPeople < 1) {
        numPeopleInput.value = 1;
        numPeople = 1;
    }
    
    // ... calculations
}
```
**Parsing explained:**
- `parseFloat(value)`: Converts string to decimal number (e.g., "25.50" → 25.5)
- `parseInt(value)`: Converts to integer (e.g., "3.7" → 3)
- `|| 0`: If parsing fails (NaN) or value is empty, use 0
- `|| 1`: Default to 1 person (can't split by 0!)

**Why this matters:**
- Prevents errors from empty inputs
- Handles invalid input gracefully
- No need for complex validation

#### 4. Mathematical Calculations
```javascript
function calculateTip() {
    const billAmount = parseFloat(billInput.value) || 0;
    const tipPercent = parseFloat(customTipInput.value) || 0;
    const numPeople = parseInt(numPeopleInput.value) || 1;
    
    // Calculate tip amount
    // Formula: bill × (percentage / 100)
    // Example: $50 × (15 / 100) = $50 × 0.15 = $7.50
    const tipAmount = billAmount * (tipPercent / 100);
    
    // Calculate total (bill + tip)
    const totalAmount = billAmount + tipAmount;
    
    // Calculate amount per person
    // Example: $57.50 / 2 people = $28.75 per person
    const amountPerPerson = totalAmount / numPeople;
    
    // Display results with currency formatting
    displayResults(tipAmount, totalAmount, amountPerPerson);
}
```

**Percentage calculation breakdown:**
- Tip = Bill × (Percent ÷ 100)
- Example: $100 bill with 20% tip
  - $100 × (20 ÷ 100) = $100 × 0.20 = $20 tip
  - Total = $100 + $20 = $120

#### 5. Currency Formatting
```javascript
function displayResults(tip, total, perPerson) {
    // Format numbers to 2 decimal places with $ prefix
    tipDisplay.textContent = `$${tip.toFixed(2)}`;
    totalDisplay.textContent = `$${total.toFixed(2)}`;
    perPersonDisplay.textContent = `$${perPerson.toFixed(2)}`;
}
```
**`toFixed(2)` explained:**
- Rounds number to 2 decimal places
- Always shows 2 digits after decimal (e.g., 5 becomes "5.00")
- Returns string (not number)

**Examples:**
```javascript
(5).toFixed(2)      // "5.00"
(5.1).toFixed(2)    // "5.10"
(5.156).toFixed(2)  // "5.16" (rounds up)
(5.154).toFixed(2)  // "5.15" (rounds down)
```

#### 6. Reset Functionality
```javascript
resetBtn.addEventListener('click', () => {
    // Clear all inputs
    billInput.value = '';
    customTipInput.value = '';
    numPeopleInput.value = '1';  // Reset to default
    
    // Remove active state from all tip buttons
    document.querySelectorAll('.tip-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Set default tip button (15%) as active
    document.querySelector('[data-tip="15"]').classList.add('active');
    customTipInput.value = '15';
    
    // Clear results
    tipDisplay.textContent = '$0.00';
    totalDisplay.textContent = '$0.00';
    perPersonDisplay.textContent = '$0.00';
    
    // Focus back to bill input for quick restart
    billInput.focus();
});
```
**Key points:**
- Reset to sensible defaults (not just empty)
- Clear visual states (active classes)
- Return focus to first input for UX

#### 7. Keyboard Support Enhancement
```javascript
// Calculate on Enter key in any input
[billInput, customTipInput, numPeopleInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateTip();
            e.target.blur();  // Remove focus after calculation
        }
    });
});
```
**Enhancement**: Users can press Enter to confirm without clicking
**`e.target.blur()`**: Removes focus (closes mobile keyboard)

## 🎨 UI/UX Features

### 1. Visual Feedback
- **Hover effects**: Buttons lift slightly on hover
- **Active states**: Selected tip button highlighted
- **Smooth transitions**: All changes animated (0.3s)
- **Color coding**: Results in brand color for emphasis

### 2. Responsive Design
```css
/* Desktop: Full width container */
.container {
    max-width: 500px;
    margin: 0 auto;
}

/* Mobile: Stack inputs vertically, smaller gaps */
@media (max-width: 600px) {
    .container {
        padding: 20px 15px;
    }
    
    .tip-buttons {
        grid-template-columns: repeat(2, 1fr);  /* 2 columns instead of 3 */
    }
    
    input {
        font-size: 16px;  /* Prevents zoom on iOS */
    }
}
```

### 3. Accessibility
- Labels for all inputs
- Placeholder text for guidance
- High contrast colors
- Large touch targets (44px minimum)
- Keyboard navigation support

## 🧮 Calculation Examples

### Example 1: Basic Tip
- **Bill**: $50.00
- **Tip**: 20%
- **People**: 1

**Calculation:**
- Tip Amount = $50.00 × 0.20 = **$10.00**
- Total = $50.00 + $10.00 = **$60.00**
- Per Person = $60.00 / 1 = **$60.00**

### Example 2: Split Bill
- **Bill**: $120.00
- **Tip**: 18%
- **People**: 4

**Calculation:**
- Tip Amount = $120.00 × 0.18 = **$21.60**
- Total = $120.00 + $21.60 = **$141.60**
- Per Person = $141.60 / 4 = **$35.40**

### Example 3: Custom Tip
- **Bill**: $75.50
- **Tip**: 22%
- **People**: 3

**Calculation:**
- Tip Amount = $75.50 × 0.22 = **$16.61**
- Total = $75.50 + $16.61 = **$92.11**
- Per Person = $92.11 / 3 = **$30.70**

## 🔧 Code Structure

```
calculateTip()           - Main calculation function
├── Parse inputs         - Get values from form
├── Validate inputs      - Check for valid numbers
├── Calculate tip        - Bill × percentage
├── Calculate total      - Bill + tip
├── Calculate per person - Total / number of people
└── Display results      - Update DOM with formatted values

Event Listeners:
- input events     → calculateTip()   (real-time updates)
- button clicks    → Set tip + calculateTip()
- reset button     → Clear all + reset to defaults
- Enter key        → calculateTip() + blur input
```

## 💡 Key Takeaways

### Formulas
```javascript
// Tip Calculation
tip = billAmount × (tipPercent / 100)

// Total Amount
total = billAmount + tip

// Amount Per Person
perPerson = total / numberOfPeople

// Currency Format
formatted = `$${amount.toFixed(2)}`
```

### Best Practices Demonstrated

1. **Input Validation**: Use `|| 0` for safe fallbacks
2. **Event Delegation**: One listener for multiple buttons
3. **Real-Time Updates**: `input` event for immediate feedback
4. **Number Precision**: `toFixed(2)` for currency display
5. **Responsive Design**: Mobile-first with media queries
6. **User Experience**: Reset functionality and keyboard support
7. **Data Attributes**: Store data in HTML for easy access
8. **Visual Feedback**: Active states and hover effects

### Common Patterns

**Pattern 1: Safe Number Parsing**
```javascript
const value = parseFloat(input.value) || defaultValue;
```

**Pattern 2: Currency Formatting**
```javascript
const formatted = `$${amount.toFixed(2)}`;
```

**Pattern 3: Toggle Active Class**
```javascript
// Remove from all
elements.forEach(el => el.classList.remove('active'));
// Add to current
currentElement.classList.add('active');
```

## 🚀 Future Enhancement Ideas

- [ ] Add service quality ratings (Poor, Average, Good, Excellent)
- [ ] Save calculation history to localStorage
- [ ] Export/share bill split via link or QR code
- [ ] Support multiple currencies with conversion
- [ ] Add tax calculation option
- [ ] Split items individually (itemized bill)
- [ ] Group expense tracking over time
- [ ] Dark mode toggle
- [ ] Print receipt functionality
- [ ] Round up to nearest dollar option

## 🐛 Common Issues & Solutions

**Issue**: Numbers show many decimal places (e.g., $10.666666)
**Solution**: Always use `.toFixed(2)` for currency display

**Issue**: Can't type decimal values
**Solution**: Use `<input type="number" step="0.01">`

**Issue**: Division by zero when people = 0
**Solution**: Validate and default to 1: `parseInt(value) || 1`

**Issue**: Percentage button stays active after custom input
**Solution**: Clear all buttons' active class when custom input changes

---

**Happy Calculating! 🧮💰**

